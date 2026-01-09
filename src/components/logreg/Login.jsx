import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios'; // импорт созданного axios

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login/', { email, password });
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            alert('Успешный вход!');
            navigate('/');
            window.location.reload(); // Чтобы Header обновил состояние
        } catch (err) {
            setError(err.response?.data?.detail || 'Ошибка при входе');
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
                    <button type="submit" className="w-full bg-neutral-800 text-white py-2 rounded-xl">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;