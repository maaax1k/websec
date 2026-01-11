import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api, { setAccessToken } from '../../api/axios';


function User() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [userData, setUserData] = useState({ id: '', first_name: '', last_name: '', email: '' });
    const [editForm, setEditForm] = useState({ first_name: '', last_name: '' });
    const handleLogout = async () => {
    try {
        await api.post('/auth/logout/');
    } catch (err) {
        console.error("Logout error", err);
    } finally {
        setAccessToken(null);
        localStorage.removeItem('user');
        navigate('/login');
        // window.location.reload(); 
    }
};
    const getUserData = async () => {
        try {
            const res = await api.get('/auth/me/');

            const { user, cart } = res.data;
            const finalUserData = {
                ...user,
                cartId: cart.id
            };

            setUserData(finalUserData);
            setEditForm({
                first_name: user.first_name,
                last_name: user.last_name
            });

            setIsLoading(false);
        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/');
            }
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getUserData();
    }, [navigate]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await api.patch('/auth/me/', {
                first_name: editForm.first_name,
                last_name: editForm.last_name
            });
            setUserData(res.data);
            setIsEditing(false);
        } catch (err) {
            console.error("Ошибка при обновлении:", err);
            alert("Не удалось сохранить данные");
        } finally {
            setIsSaving(false);
            getUserData();
            window.location.reload();
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[80vh] bg-gray-100 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                    <div className="bg-neutral-300 p-6 flex items-center space-x-4">
                        <div className="h-16 w-16 bg-neutral-400 rounded-full"></div>
                        <div className="space-y-2 flex-1">
                            <div className="h-5 bg-neutral-400 rounded w-1/2"></div>
                            <div className="h-3 bg-neutral-400 rounded w-1/3"></div>
                        </div>
                    </div>
                    <div className="p-6 space-y-8">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="space-y-2">
                                <div className="h-3 bg-gray-200 rounded w-20"></div>
                                <div className="h-6 bg-gray-100 rounded w-full border-b border-gray-100"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden">

                <div className="bg-neutral-800 p-6">
                    <div className="flex items-center space-x-4">
                        <div className="h-16 w-16 bg-neutral-200 rounded-full flex items-center justify-center text-neutral-700 text-2xl font-bold uppercase">
                            {userData.first_name?.[0]}{userData.last_name?.[0]}
                        </div>
                        <div>
                            <h2 className="text-white text-xl font-bold">Личный кабинет</h2>
                            <p className="text-neutral-300 text-sm">
                                {isEditing ? 'Редактирование данных' : 'Просмотр профиля'}
                            </p>
                        </div>
                    </div>
                </div>


                <div className="p-6 space-y-6">

                    <div>
                        <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider">Имя</label>
                        {isEditing ? (
                            <input
                                type="text"
                                className="mt-1 w-full text-lg font-semibold border-b-2 border-neutral-400 focus:border-neutral-600 outline-none pb-1 transition-colors"
                                value={editForm.first_name}
                                onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
                            />
                        ) : (
                            <p className="mt-1 text-lg text-gray-900 font-semibold border-b border-gray-100 pb-2">
                                {userData.first_name || 'Не указано'}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider">Фамилия</label>
                        {isEditing ? (
                            <input
                                type="text"
                                className="mt-1 w-full text-lg font-semibold border-b-2 border-neutral-400 focus:border-neutral-600 outline-none pb-1 transition-colors"
                                value={editForm.last_name}
                                onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
                            />
                        ) : (
                            <p className="mt-1 text-lg text-gray-900 font-semibold border-b border-gray-100 pb-2">
                                {userData.last_name || 'Не указано'}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider">Email адрес</label>
                        <p className="mt-1 text-lg text-yellow-600 font-medium border-b border-gray-100 pb-2 opacity-70">
                            {userData.email}
                        </p>
                    </div>

                    <div className="pt-4 space-y-3">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition duration-200 shadow-md disabled:bg-gray-400"
                                >
                                    {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setEditForm({ first_name: userData.first_name, last_name: userData.last_name });
                                    }}
                                    className="w-full cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-xl transition duration-200"
                                >
                                    Отмена
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="w-full cursor-pointer bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 px-4 rounded-xl transition duration-200 shadow-md"
                                >
                                    Редактировать профиль
                                </button>

                                <Link
                                    to="/orders"
                                    className="w-full flex items-center justify-center space-x-2 bg-white border-2 border-neutral-800 text-neutral-800 hover:bg-neutral-50 font-bold py-3 px-4 rounded-xl transition duration-200 shadow-sm"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    <span>Мои заказы</span>
                                </Link>
                            </>
                        )}

                        <button
                            onClick={handleLogout}
                            className="w-full cursor-pointer bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded-xl transition duration-200 shadow-md"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;