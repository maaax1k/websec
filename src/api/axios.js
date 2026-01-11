import axios from 'axios';

let accessToken = null;

export const setAccessToken = (token) => {
    accessToken = token;
};

const api = axios.create({
    baseURL: '/websec', 
    withCredentials: true, 
});


api.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await axios.post('/websec/auth/refresh/', {}, { withCredentials: true });
                const newToken = res.data.access;
                
                setAccessToken(newToken); 
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                
                return axios(originalRequest); 
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