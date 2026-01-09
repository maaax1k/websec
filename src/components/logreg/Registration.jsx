import { useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom'

function Register() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const response = await api.post('/auth/register/', formData);
      setMessage(response.data.detail);
    } catch (err) {
      const errors = err.response?.data;
      setMessage(errors ? Object.values(errors).join(' ') : 'Ошибка регистрации');
    } finally {
      setLoading(false);
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
            onChange={e => setFormData({ ...formData, first_name: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
            required
          />
          <input
            placeholder="Last name"
            onChange={e => setFormData({ ...formData, last_name: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
            required
          />
          <input
            type="email"
            placeholder="Email"
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
            required
          />
          <button
            type="submit"
            disabled={loading} 
            className={`w-full py-2 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2
    ${loading
                ? 'bg-neutral-500 cursor-not-allowed'
                : 'bg-neutral-800 hover:bg-neutral-900 active:scale-[0.98] text-white'
              }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <span>Sign Up</span>
            )}
          </button>
          <Link className='w-full text-center block text-yellow-600' to='/login'>Sign In</Link>
        </form>
      </div>
    </div>
  );
}

export default Register;