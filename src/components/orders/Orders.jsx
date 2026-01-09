import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const isAuth = !!localStorage.getItem('user');

    useEffect(() => {
        window.scrollTo(0, 0);
        if (isAuth) {
            fetchOrders();
        } else {
            setIsLoading(false);
        }
    }, [isAuth]);

    const fetchOrders = async () => {
        try {
            const res = await api.get('/orders/');
            setOrders(res.data);
        } catch (err) {
            console.error("Ошибка загрузки заказов", err);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return (
        <div className='flex justify-center items-center my-40'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neutral-900'></div>
        </div>
    );

    if (!isAuth) return (
        <div className="mx-[10%] my-20 text-center bg-neutral-50 rounded-[3rem] p-20 border border-neutral-100">
            <h2 className="text-2xl font-bold mb-4 uppercase tracking-tighter">Вход не выполнен</h2>
            <p className="text-neutral-500 mb-8">Войдите в систему, чтобы просмотреть историю ваших заказов.</p>
            <Link to="/login" className="inline-block bg-neutral-900 text-white px-10 py-4 rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-neutral-800 transition-all">
                Sign In
            </Link>
        </div>
    );

    return (
        <div className="mx-[10%] my-12 text-neutral-800 animate-fadeIn">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-5xl font-bold tracking-tighter uppercase">My Orders</h1>
                    <p className="text-neutral-400 text-sm mt-2 font-medium tracking-wide">История ваших покупок и статусы доставки</p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Всего заказов</p>
                    <p className="text-2xl font-black">{orders.length}</p>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="bg-neutral-50 rounded-[3rem] p-20 text-center border border-dashed border-neutral-200">
                    <p className="text-neutral-400 mb-8 uppercase tracking-widest text-sm font-bold">У вас еще нет заказов</p>
                    <Link to="/catalog" className="inline-block bg-neutral-900 text-white px-10 py-4 rounded-full font-bold hover:bg-neutral-800 transition-all text-[10px] tracking-widest shadow-lg">
                        Go Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-10">
                    {orders.map((order) => (
                        <div key={order.id} className="group bg-white border border-neutral-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="bg-neutral-50/50 px-10 py-8 flex flex-wrap justify-between items-center gap-6 border-b border-neutral-100">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">Order Number</p>
                                    <p className="font-bold text-lg">#{order.id.toString().padStart(5, '0')}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">Date</p>
                                    <p className="font-bold text-sm">{new Date(order.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">Method</p>
                                    <p className="font-bold text-sm uppercase">{order.delivery_method}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">Status</p>
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${order.status === 'delivered' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                        <span className={`text-[11px] font-black uppercase tracking-widest ${order.status === 'delivered' ? 'text-green-600' : 'text-yellow-600'}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-1">Total</p>
                                    <p className="text-2xl font-black tracking-tighter text-neutral-900">
                                        {Math.round(order.total_amount).toLocaleString()} ₸
                                    </p>
                                </div>
                            </div>
                            <div className="p-10">
                                <div className="flex flex-col lg:flex-row gap-12">
                                    <div className="flex-1">
                                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-6">Items</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {order.items?.map((item) => (
                                                <div key={item.id} className="flex items-center gap-4 p-3 rounded-2xl border border-neutral-50 hover:bg-neutral-50 transition-colors">
                                                    <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-neutral-100">
                                                        <img 
                                                            src={item.product.images?.[0]?.image || 'https://via.placeholder.com/100'} 
                                                            alt={item.product.name} 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="text-[11px] font-bold uppercase truncate pr-2">{item.product.name}</h4>
                                                        <p className="text-[10px] text-neutral-500 font-medium mt-0.5">
                                                            {Math.round(item.product.price).toLocaleString()} ₸ × {item.quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="lg:w-1/3 border-t lg:border-t-0 lg:border-l border-neutral-100 pt-8 lg:pt-0 lg:pl-12">
                                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-4">Shipping details</p>
                                        <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
                                            <p className="text-xs text-neutral-600 leading-relaxed font-medium mb-4">
                                                {order.shipping_address}
                                            </p>
                                            <div className="flex items-center gap-2 text-neutral-400">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="text-[10px] font-bold uppercase tracking-widest">{order.delivery_method}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Orders;