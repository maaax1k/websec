import axios from 'axios';

// Храним токен в памяти (недоступно для XSS)
let accessToken = null;

export const setAccessToken = (token) => {
    accessToken = token;
};

const api = axios.create({
    baseURL: '/websec', 
    withCredentials: true, // Передаем куки (Refresh и CSRF)
});

// Добавляем Access Token в каждый запрос
api.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// Перехватчик для обновления токена
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Если 401 (токен протух) и мы еще не пробовали обновиться
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await axios.post('/websec/auth/refresh/', {}, { withCredentials: true });
                const newToken = res.data.access;
                
                setAccessToken(newToken); // Сохраняем новый токен в память
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                
                return axios(originalRequest); // Повторяем запрос
            } catch (refreshError) {
                setAccessToken(null);
                localStorage.removeItem('user');
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;