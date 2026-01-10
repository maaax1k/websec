import React, { useState, useEffect } from 'react'
import api from '../../api/axios'
import { Link } from 'react-router-dom'

function MiniCatalog() {
    const [prod, setProd] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [itemsPerSlide, setItemsPerSlide] = useState(4)
    const [addingId, setAddingId] = useState(null); // хранит ID товара, который в процессе добавления
    const addToCart = async (productId) => {
        setAddingId(productId);

        try {
            // 1. Достаем данные пользователя из localStorage
            const storedUser = localStorage.getItem('user');

            // 2. Проверяем, есть ли данные, и извлекаем cartId
            if (!storedUser) {
                console.error("Пользователь не авторизован");
                return;
            }

            const { cartId } = JSON.parse(storedUser);

            // 3. Отправляем запрос с динамическим cartId
            const response = await api.post('/cart-items/', {
                cart: cartId, // Используем полученный ID
                product_id: productId,
                quantity: 1
            });

            if (response.status === 201) {
                setAddingId('success-' + productId);
                setTimeout(() => {
                    setAddingId(null);
                }, 1000);
            }
        } catch (err) {
            console.error("Ошибка при добавлении в корзину:", err);
            setAddingId('error-' + productId);
            setTimeout(() => setAddingId(null), 2000);
        }
    };
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await api.get('/products/');
                const lastItems = res.data.length > 8
                    ? res.data.slice(0, 8)
                    : res.data;
                setProd(lastItems);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
                setIsLoading(false);
            }
        }
        getProducts();

        const updateItemsPerSlide = () => {
            if (window.innerWidth < 640) setItemsPerSlide(1);
            else if (window.innerWidth < 768) setItemsPerSlide(2);
            else setItemsPerSlide(4);
        };

        updateItemsPerSlide();
        window.addEventListener('resize', updateItemsPerSlide);
        return () => window.removeEventListener('resize', updateItemsPerSlide);
    }, []);

    const nextSlide = () => {
        const slidesCount = Math.ceil(prod.length / itemsPerSlide);
        setCurrentIndex((prev) => (prev + 1 < slidesCount ? prev + 1 : 0));
    }

    const prevSlide = () => {
        const slidesCount = Math.ceil(prod.length / itemsPerSlide);
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : slidesCount - 1));
    }

    // Компонент скелетона
    const SkeletonCard = () => (
        <div
            className='rounded-lg mx-2 p-3 animate-pulse shrink-0'
            style={{ width: `calc(${100 / itemsPerSlide}% - 1rem)` }}
        >
            <div className='w-full aspect-[4/5] bg-neutral-200 rounded-md mb-3'></div>
            <div className='flex justify-between items-start'>
                <div className='flex-1 space-y-2'>
                    <div className='h-4 bg-neutral-300 rounded w-3/4'></div>
                    <div className='h-3 bg-neutral-200 rounded w-1/2'></div>
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <div className='h-7 bg-neutral-300 rounded-lg w-12'></div>
                    <div className='h-3 bg-neutral-200 rounded w-8'></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className='py-5'>
            <h2 className='text-2xl md:text-3xl tracking-tighter mx-5 md:mx-7 my-3 text-neutral-900 font-bold'>New Arrivals</h2>

            <div className='relative overflow-hidden py-3 px-2 md:px-4 mx-2 md:mx-5'>
                <div
                    className='flex transition-transform duration-500 ease-in-out'
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {isLoading ? (
                        Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                    ) : (
                        prod.map((item, index) => (
                            <Link to={`/product/${item.id}`}
                                className='rounded-lg mx-2 p-3 hover:bg-neutral-100 cursor-pointer transition-all shrink-0 group'
                                style={{ width: `calc(${100 / itemsPerSlide}% - 1rem)` }}
                                key={item.id || index}
                            >
                                <div className='overflow-hidden rounded-md'>
                                    <img
                                        src={item.images?.length > 0 ? item.images[0].image : "/banner.jpg"}
                                        alt={item.name}
                                        className='w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-300'
                                    />
                                </div>
                                <div className='flex justify-between mt-3 gap-1'>
                                    <div className='overflow-hidden'>
                                        <p className='text-lg font-semibold truncate text-neutral-800'>{item.brand?.name}</p>
                                        <p className='text-neutral-500 text-sm truncate'>{item.name}</p>
                                    </div>
                                    <div className='flex flex-col items-center justify-center min-w-[60px]'>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                if (!addingId) addToCart(item.id);
                                            }}
                                            className={`
                                                        relative rounded-lg px-2 py-1.5 text-xs transition-all duration-300 
                                                        cursor-pointer flex items-center justify-center gap-2 uppercase mx-2 tracking-wider z-20 min-w-[85px]
                                                        ${addingId === 'success-' + item.id ? 'bg-green-600 text-white' :
                                                    addingId === 'error-' + item.id ? 'bg-red-600 text-white' :
                                                        'bg-neutral-800 text-white hover:bg-black active:scale-95'}
                                                    `}
                                        >
                                            {addingId === item.id ? (
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            ) : addingId === 'success-' + item.id ? (
                                                <span className="flex items-center gap-1">DONE ✓</span>
                                            ) : addingId === 'error-' + item.id ? (
                                                <span>ERR!</span>
                                            ) : (
                                                <span>+ cart</span>
                                            )}
                                        </button>
                                        <p className='text-yellow-600 mt-1'>{item.price}&nbsp;tg.</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
                {!isLoading && prod.length > itemsPerSlide && (
                    <>
                        <button
                            onClick={prevSlide}
                            className='cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md text-neutral-800 p-3 rounded-full z-10 transition-all border border-neutral-200'
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button
                            onClick={nextSlide}
                            className='cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md text-neutral-800 p-3 rounded-full z-10 transition-all border border-neutral-200'
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default MiniCatalog;