import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem('user'));


    useEffect(() => {
        window.scrollTo(0, 0);
        if (isAuth) {
            fetchCart();
        } else {
            setIsLoading(false);
        }
    }, [isAuth]);

    const [shippingAddress, setShippingAddress] = useState('');
    const [isOrdering, setIsOrdering] = useState(false);
    const [statusMsg, setStatusMsg] = useState({ type: '', text: '' }); // Для вывода ошибок/успеха

    const handleCreateOrder = async () => {
        setStatusMsg({ type: '', text: '' });

        if (!shippingAddress.trim()) {
            setStatusMsg({ type: 'error', text: 'Укажите адрес доставки' });
            return;
        }

        setIsOrdering(true);
        try {
            await api.post('/orders/from_cart/', {
                shipping_address: shippingAddress
            });

            setStatusMsg({ type: 'success', text: 'Заказ успешно оформлен!' });

            setTimeout(() => {
                setCartItems([]);
                setShippingAddress('');
            }, 2000);

        } catch (err) {
            const errorText = err.response?.data?.detail || "Ошибка при оформлении";
            setStatusMsg({ type: 'error', text: errorText });
        } finally {
            setIsOrdering(false);
        }
    };

    const fetchCart = async () => {
        try {
            const res = await api.get('/cart-items/');
            // ИСПРАВЛЕНО: Добавлен мапинг данных, который был потерян
            const initializedItems = res.data.map(item => ({
                ...item,
                total_item_price: (parseFloat(item.product.price) * item.quantity).toString()
            }));
            setCartItems(initializedItems);
        } catch (err) {
            if (err.response?.status === 401) {
                setIsAuth(false);
                localStorage.removeItem('user');
            }
            console.error("Ошибка загрузки корзины", err);
        } finally {
            setIsLoading(false);
        }
    };
    // Оптимизированное удаление
    const removeItem = async (id) => {
        // 1. Сохраняем копию на случай ошибки
        const previousItems = [...cartItems];

        // 2. Мгновенно обновляем UI
        setCartItems(prev => prev.filter(item => item.id !== id));

        try {
            await api.delete(`/cart-items/${id}/`);
        } catch (err) {
            // 3. Если ошибка — возвращаем как было
            console.error("Не удалось удалить", err);
            setCartItems(previousItems);
            alert("Ошибка при удалении товара");
        }
    };

    // Оптимизированное изменение количества
    const updateQuantity = async (id, newQty) => {
        if (newQty < 1) return;

        const previousItems = [...cartItems];

        // 1. Мгновенно меняем состояние в UI
        setCartItems(prev => prev.map(item =>
            item.id === id ? {
                ...item,
                quantity: newQty,
                total_item_price: (parseFloat(item.unit_price) * newQty).toString()
            } : item
        ));

        try {
            // 2. Отправляем запрос в фоне
            await api.patch(`/cart-items/${id}/`, { quantity: newQty });
        } catch (err) {
            // 3. Откат при ошибке
            console.error("Ошибка обновления", err);
            setCartItems(previousItems);
        }
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.total_item_price), 0);

    if (isLoading) return (
        <div className='flex justify-center items-center my-40'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neutral-900'></div>
        </div>
    );

    return (
        <div className="mx-[10%] my-12 text-neutral-800 animate-fadeIn">
            <h1 className="text-4xl font-black mb-10 tracking-tighter">Shopping Cart</h1>

            {!isAuth ? (
                /* КЕЙС: ПОЛЬЗОВАТЕЛЬ НЕ АВТОРИЗОВАН */
                <div className="bg-neutral-50 rounded-[3rem] p-20 text-center border border-neutral-100 shadow-inner">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                        <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold mb-2 uppercase tracking-tight">Вход не выполнен</h2>
                    <p className="text-neutral-500 text-sm mb-10 max-w-xs mx-auto">Чтобы добавлять товары и оформлять заказы, пожалуйста, войдите в свой профиль.</p>
                    <Link to="/login" className="inline-block bg-neutral-900 text-white px-12 py-4 rounded-full font-bold hover:bg-neutral-800 transition-all uppercase text-[10px] tracking-[0.2em] shadow-xl active:scale-95">
                        Sign In
                    </Link>
                </div>
            ) :


                cartItems.length === 0 ? (
                    <div className="bg-neutral-50 rounded-3xl p-20 text-center border border-dashed border-neutral-200">
                        <p className="text-neutral-400 mb-8 uppercase tracking-[0.2em] text-sm font-bold">Корзина пуста</p>
                        <Link to="/catalog" className="inline-block bg-neutral-900 text-white px-10 py-4 rounded-full font-bold hover:bg-neutral-800 transition-all uppercase text-[10px] tracking-widest shadow-lg">
                            Go Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="flex-1 space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="group relative bg-white rounded-3xl p-5 flex flex-col md:flex-row items-center gap-8 shadow-sm border border-neutral-100 hover:shadow-md transition-all">

                                    <div className="relative w-32 h-40 shrink-0 overflow-hidden rounded-2xl bg-neutral-100">
                                        <img
                                            src={item.product.images[0]?.image || 'https://via.placeholder.com/150'}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="flex-1 w-full">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                                                    {item.product.brand.name}
                                                </span>
                                                <h3 className="font-bold text-lg uppercase tracking-tight mt-1 leading-tight">{item.product.name}</h3>
                                            </div>

                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-neutral-300 hover:text-black transition-colors p-2"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-8">
                                            {/* Контроллер количества */}
                                            <div className="flex items-center bg-neutral-50 rounded-full border border-neutral-100 p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-black hover:bg-white rounded-full transition-all"
                                                >–</button>
                                                <span className="px-4 text-sm w-10 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-black hover:bg-white rounded-full transition-all"
                                                >+</button>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-yellow-600 font-bold text-xl tracking-tight">{Math.round(item.total_item_price).toLocaleString()} ₸</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary Panel */}
                        <div className="lg:w-[380px]">
                            <div className="bg-neutral-900 text-white rounded-[2.5rem] p-10 sticky top-25 shadow-2xl">
                                <h2 className="text-2xl font-bold tracking-tighter mb-8 border-b border-neutral-800 pb-6">Checkout</h2>

                                {/* Поле адреса */}
                                <div className="mb-6">
                                    <label className="text-neutral-500 uppercase text-[10px] font-bold tracking-widest block mb-3">
                                        Shipping Address
                                    </label>
                                    <textarea
                                        value={shippingAddress}
                                        onChange={(e) => {
                                            setShippingAddress(e.target.value);
                                            if (statusMsg.text) setStatusMsg({ type: '', text: '' }); // Убираем ошибку при наборе
                                        }}
                                        placeholder="City, Street, Building..."
                                        className={`w-full bg-neutral-800 border rounded-xl p-4 text-sm text-white placeholder:text-neutral-600 focus:outline-none transition-all resize-none h-24
                    ${statusMsg.type === 'error' ? 'border-red-500/50' : 'border-neutral-700 focus:border-neutral-500'}`}
                                    />
                                </div>

                                {/* Блок сообщений (вместо алертов) */}
                                {statusMsg.text && (
                                    <div className={`mb-6 text-[11px] font-bold uppercase tracking-wider p-3 rounded-lg text-center animate-pulse
                ${statusMsg.type === 'error' ? 'text-red-400 bg-red-400/10' : 'text-green-400 bg-green-400/10'}`}>
                                        {statusMsg.text}
                                    </div>
                                )}

                                <div className="space-y-4 mb-10">
                                    {/* Твои Subtotal, Shipping, Total */}
                                    <div className="flex justify-between text-neutral-500 uppercase text-[10px] font-bold tracking-widest">
                                        <span>Subtotal</span>
                                        <span className="text-white">{totalPrice.toLocaleString()} ₸</span>
                                    </div>
                                    <div className="pt-6 border-t border-neutral-800 flex justify-between items-end">
                                        <span className="text-neutral-400 uppercase text-[10px] font-bold tracking-widest">Total</span>
                                        <span className="text-3xl font-black tracking-tighter">{totalPrice.toLocaleString()} ₸</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCreateOrder}
                                    disabled={isOrdering || cartItems.length === 0}
                                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center space-x-3
                ${isOrdering || cartItems.length === 0
                                            ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed opacity-50'
                                            : 'bg-white text-black hover:bg-neutral-200 active:scale-95'
                                        }`}
                                >
                                    {isOrdering ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent"></div>
                                    ) : (
                                        "Pay Now"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Cart;