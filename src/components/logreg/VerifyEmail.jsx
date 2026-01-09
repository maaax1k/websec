import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';

function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            const uid = searchParams.get('uid');
            const token = searchParams.get('token');

            if (!uid || !token) {
                setStatus('error');
                return;
            }

            try {
                // Отправляем GET запрос на ваш бэкенд через прокси
                // Эндпоинт на бэке: /websec/api/auth/verify-email/
                await api.get('/auth/verify-email/', {
                    params: { uid, token }
                });
                
                setStatus('success');
                // Через 3 секунды редиректим на логин
                setTimeout(() => navigate('/login'), 3000);
            } catch (err) {
                console.error(err);
                setStatus('error');
            }
        };

        verify();
    }, [searchParams, navigate]);

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-sm w-full">
                {status === 'verifying' && (
                    <>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-800 mx-auto mb-4"></div>
                        <h2 className="text-xl font-semibold">Подтверждаем почту...</h2>
                        <p className="text-gray-500 mt-2">Пожалуйста, подождите.</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="text-green-500 text-5xl mb-4">✓</div>
                        <h2 className="text-xl font-semibold text-green-600">Почта подтверждена!</h2>
                        <p className="text-gray-500 mt-2">Сейчас вы будете перенаправлены на страницу входа.</p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="text-red-500 text-5xl mb-4">✕</div>
                        <h2 className="text-xl font-semibold text-red-600">Ошибка активации</h2>
                        <p className="text-gray-500 mt-2 mb-6">Ссылка недействительна или срок её действия истёк.</p>
                        <Link to="/registration" className="bg-neutral-800 text-white px-6 py-2 rounded-xl">
                            Попробовать снова
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default VerifyEmail;