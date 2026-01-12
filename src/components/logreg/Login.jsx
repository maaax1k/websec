import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api, { setAccessToken } from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
        const response = await api.post('/auth/login/', { email, password });
        login(response.data); 
        
        setIsSuccess(true);
        setTimeout(() => navigate('/'), 800); 
    } catch (err) {
        setError('Ошибка входа');
    } finally {
        setIsLoggingIn(false);
    }
};

    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full border rounded-xl px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Пароль</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full border rounded-xl px-3 py-2"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoggingIn || isSuccess}
                        className={`
        w-full py-3 rounded-xl uppercase tracking-widest text-sm transition-all duration-300
        ${isSuccess
                                ? 'bg-green-600 text-white'
                                : 'bg-neutral-800 hover:bg-black text-white active:scale-[0.99] disabled:opacity-70'
                            }
    `}
                    >
                        <div className="flex items-center justify-center gap-2">
                            {isLoggingIn ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                    <span>Checking...</span>
                                </>
                            ) : isSuccess ? (
                                <>
                                    <svg className="w-5 h-5 animate-bounceSmall" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Welcome back</span>
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </div>
                    </button>
                    <Link className='w-full text-center block text-yellow-600' to='/registration'>Sign Up</Link>
                </form>
            </div>a
        </div>
    );
}

export default Login;