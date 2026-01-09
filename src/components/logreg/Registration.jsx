import { useState } from 'react';
import api from '../../api/axios';

function Register() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register/', formData);
      setMessage(response.data.detail); // "Проверь почту..."
    } catch (err) {
      const errors = err.response?.data;
      setMessage(errors ? Object.values(errors).join(' ') : 'Ошибка регистрации');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Registration</h2>
        {message && <p className="text-blue-600 text-sm mb-4 text-center">{message}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            placeholder="First name"
            onChange={e => setFormData({...formData, first_name: e.target.value})}
            className="w-full border rounded-xl px-3 py-2"
            required
          />
          <input 
            placeholder="Last name"
            onChange={e => setFormData({...formData, last_name: e.target.value})}
            className="w-full border rounded-xl px-3 py-2"
            required
          />
          <input 
            type="email"
            placeholder="Email"
            onChange={e => setFormData({...formData, email: e.target.value})}
            className="w-full border rounded-xl px-3 py-2"
            required
          />
          <input 
            type="password" 
            placeholder="Password"
            onChange={e => setFormData({...formData, password: e.target.value})}
            className="w-full border rounded-xl px-3 py-2"
            required
          />
          <button type="submit" className="w-full bg-neutral-800 text-white py-2 rounded-xl">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;