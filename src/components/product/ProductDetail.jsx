import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleAddToCart = async () => {
        setIsAdding(true);
        try {
            const response = await api.post('/cart-items/', {
                cart: 2,
                product_id: product.id,
                quantity: 1
            });
            if (response.status === 201) {
                setIsAdding(false);
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 2000);
            }
        } catch (err) {
            console.error(err);
            setIsAdding(false);
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await api.get(`/products/${id}/`);
                setProduct(res.data);
                if (res.data.images?.length > 0) {
                    setActiveImage(res.data.images[0].image);
                }
                setIsLoading(false);
            } catch (err) {
                console.error(err);
                setIsLoading(false);
            }
        };
        getProduct();
    }, [id]);

    if (isLoading) {
        return (
            <div className='mx-[10%] my-10 bg-white rounded-2xl shadow-lg p-8 animate-pulse'>
                <div className='flex flex-col md:flex-row gap-10'>
                    <div className='flex-1 aspect-square bg-neutral-200 rounded-xl'></div>
                    <div className='flex-1 space-y-4'>
                        <div className='h-8 bg-neutral-300 rounded w-3/4'></div>
                        <div className='h-4 bg-neutral-200 rounded w-1/2'></div>
                        <div className='h-10 bg-neutral-300 rounded w-1/3 mt-10'></div>
                        <div className='h-12 bg-neutral-800 rounded-xl w-full mt-20'></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) return <div className='text-center py-20'>Product not found</div>;

    return (
        <div className='mx-[10%] my-10 bg-white rounded-2xl shadow-lg text-neutral-800 overflow-hidden'>
            <div className='flex flex-col md:flex-row p-6 md:p-10 gap-10'>


                <div className='flex-1 max-w-full md:max-w-[35%]'>
                    <div className='rounded-xl overflow-hidden bg-neutral-50 flex justify-center items-center h-fit max-h-[60vh] border border-neutral-100'>
                        <img
                            src={activeImage || "/banner.jpg"}
                            alt={product.name}

                            className='w-full h-full max-h-[65vh] object-contain'
                        />
                    </div>


                    <div className='flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide'>
                        {product.images?.map((img) => (
                            <div
                                key={img.id}
                                onClick={() => setActiveImage(img.image)}
                                className={`cursor-pointer shrink-0 w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${activeImage === img.image ? 'border-neutral-800' : 'border-transparent opacity-60 hover:opacity-100'
                                    }`}
                            >
                                <img src={img.image} className='w-full h-full object-cover' alt="preview" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className='flex-1 flex flex-col'>
                    <div className='mb-auto'>
                        <p className='text-neutral-500 uppercase tracking-tighter text-xs mb-1'>
                            {product.brand?.name}
                        </p>
                        <h1 className='text-2xl md:text-3xl font-bold text-neutral-900 mb-2 leading-tight uppercase'>
                            {product.name}
                        </h1>
                        <p className='text-neutral-400 text-xs mb-6'>Category: {product.category?.name}</p>

                        <div className='flex items-baseline gap-4 mb-6'>
                            <p className='text-3xl font-bold text-yellow-600'>{Number(product.price).toLocaleString()}&nbsp;tg.</p>
                            <p className='text-neutral-400 text-[10px] tracking-widest uppercase'>SKU: {product.sku}</p>
                        </div>

                        <div className='flex flex-col sm:flex-row gap-3 mb-8'>
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdding || isSuccess}
                                className={`
        flex-[2] py-4 rounded-xl transition-all duration-300 cursor-pointer shadow-md text-sm uppercase font-bold tracking-widest
        ${isSuccess
                                        ? 'bg-neutral-100 text-neutral-900 border border-neutral-200'
                                        : 'bg-neutral-800 hover:bg-black text-white active:scale-[0.98]'
                                    }
    `}
                            >
                                <div className="flex items-center justify-center gap-3">
                                    {isAdding ? (

                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                    ) : isSuccess ? (

                                        <span className="flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Added to your cart
                                        </span>
                                    ) : (

                                        <span>+ Add to cart</span>
                                    )}
                                </div>
                            </button>
                            <button className='flex-1 border border-neutral-200 hover:bg-neutral-50 text-neutral-800 font-bold py-4 rounded-xl transition-colors cursor-pointer text-sm uppercase'>
                                Buy Now
                            </button>
                        </div>

                        <div className='border-t border-neutral-100 pt-6'>
                            <p className='text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3'>
                                Description
                            </p>

                            <div className='relative'>
                                <div className={`text-neutral-600 text-sm leading-relaxed whitespace-pre-line transition-all duration-300 ${!isExpanded ? 'line-clamp-3' : ''
                                    }`}>
                                    {product.description}
                                </div>

                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className='mt-2 text-neutral-800 font-bold text-xs hover:underline transition-colors cursor-pointer flex items-center gap-1 uppercase tracking-wider'
                                >
                                    {isExpanded ? 'Show less ↑' : 'Read more ↓'}
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className='mt-10 pt-6 border-t border-neutral-100 flex justify-between items-center text-[11px] uppercase tracking-widest'>
                        <div className='flex flex-col'>
                            <span className='text-neutral-400'>Stock</span>
                            <span className='font-bold text-neutral-800'>{product.quantity > 0 ? `${product.quantity} items` : 'Out of stock'}</span>
                        </div>
                        <div className='text-right'>
                            <span className='text-neutral-400 block'>Delivery</span>
                            <span className='font-bold text-neutral-800'>Standard Shipping</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;