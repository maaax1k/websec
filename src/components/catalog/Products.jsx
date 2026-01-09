import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axios'

function Products({ products, isLoading }) { 
    const [selectedPage, setSelectedPage] = useState(1)
    const [productsSliced, setProductsSliced] = useState(() => (products ? products.slice(0, 20) : []))
    const [addingId, setAddingId] = useState(null); 
    const addToCart = async (productId) => {
        setAddingId(productId);

        try {
            const response = await api.post('/cart-items/', {
                cart: 2,
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
            console.error("Ошибка:", err);
            setAddingId('error-' + productId);
            setTimeout(() => setAddingId(null), 2000);
        }
    };

    const pageNumber = Math.ceil((products?.length || 0) / 20)
    const pages = Array.from({ length: pageNumber }, (_, i) => i + 1);

    const handleSelectPage = (page) => {
        setSelectedPage(page)
        const start = (page - 1) * 20;
        const end = start + 20;
        setProductsSliced(products.slice(start, end))
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        setSelectedPage(1)
        setProductsSliced(() => (products ? products.slice(0, 20) : []))
    }, [products])


    const ProductSkeleton = () => (
        <div className='rounded-lg p-3 animate-pulse'>
            <div className='w-full aspect-square bg-neutral-200 rounded-md'></div>
            <div className='flex justify-between mt-3'>
                <div className='space-y-2 flex-1 mr-4'>
                    <div className='h-5 bg-neutral-300 rounded w-3/4'></div>
                    <div className='h-4 bg-neutral-200 rounded w-1/2'></div>
                </div>
                <div className='flex flex-col items-center space-y-2'>
                    <div className='h-8 bg-neutral-300 rounded-lg w-16'></div>
                    <div className='h-4 bg-neutral-200 rounded w-10'></div>
                </div>
            </div>
        </div>
    )

    if (!products && !isLoading) return <div></div>

    return (
        <div className='px-4 pb-4'>
            <p className='text-2xl md:text-3xl md:mx-3 my-3 text-neutral-900 font-bold'>Our products</p>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                {isLoading ? (
                    Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
                ) : (
                    productsSliced.map((prod, index) => (
                        <Link to={`/product/${prod.id}`} className='rounded-lg p-3 hover:bg-neutral-200 cursor-pointer transition-all w-full border border-transparent' key={index}>
                            <img
                                src={prod.images?.length > 0 ? prod.images[0].image : "/banner.jpg"}
                                alt={prod.brand?.name}
                                className='w-full aspect-square object-cover rounded-md shadow-sm'
                            />
                            <div className='flex justify-between mt-3'>
                                <div>
                                    <p className='text-lg md:text-xl font-medium'>{prod.brand?.name}</p>
                                    <p className='text-neutral-500 text-sm mt-1'>{prod.name}</p>
                                </div>
                                <div className='flex flex-col items-center justify-center'>
                                    <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                if (!addingId) addToCart(prod.id);
                                            }}
                                            className={`
                                                        relative rounded-lg px-2 py-1.5 text-xs transition-all duration-300 
                                                        cursor-pointer flex items-center justify-center gap-2 uppercase mx-2 tracking-wider z-20 min-w-[85px]
                                                        ${addingId === 'success-' + prod.id ? 'bg-green-600 text-white' :
                                                                                                    addingId === 'error-' + prod.id ? 'bg-red-600 text-white' :
                                                                                                        'bg-neutral-800 text-white hover:bg-black active:scale-95'}
                                                    `}
                                        >
                                            {addingId === prod.id ? (
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            ) : addingId === 'success-' + prod.id ? (
                                                <span className="flex items-center gap-1">DONE ✓</span>
                                            ) : addingId === 'error-' + prod.id ? (
                                                <span>ERR!</span>
                                            ) : (
                                                <span>+ cart</span>
                                            )}
                                        </button>
                                    <p className='text-yellow-600 mt-2'>{prod.price}&nbsp;tg.</p>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
            {!isLoading && pageNumber > 1 && (
                <div className='flex justify-center items-center mt-8'>
                    <ul className='flex gap-2 flex-wrap justify-center'>
                        {pages.map((page) => (
                            <li
                                key={page}
                                onClick={() => handleSelectPage(page)}
                                className={`px-4 py-2 rounded-lg cursor-pointer transition-all font-medium ${selectedPage === page
                                        ? 'bg-neutral-800 text-white shadow-md'
                                        : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                                    }`}
                            >
                                {page}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Products