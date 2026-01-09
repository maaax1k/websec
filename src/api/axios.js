import axios from 'axios';

const api = axios.create({
    // Теперь baseURL — это относительный путь вашего же сайта
    baseURL: '/websec', 
    withCredentials: true, // Обязательно для передачи кук
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
});

// Перехватчик ответов
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await axios.post('/websec/auth/refresh/', {}, { withCredentials: true });
                
                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('user');
                // window.location.href = '/login'; // Опционально: жесткий редирект
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;