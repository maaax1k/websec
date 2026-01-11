import axios from 'axios';

let accessToken = null;
let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
};

const onRefreshed = (token) => {
    refreshSubscribers.map((cb) => cb(token));
    refreshSubscribers = [];
};

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

            if (isRefreshing) {
                return new Promise((resolve) => {
                    subscribeTokenRefresh((newToken) => {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        resolve(api(originalRequest));
                    });
                });
            }
            originalRequest._retry = true;
            isRefreshing = true;
            try {
                const res = await axios.post('/websec/auth/refresh/', {}, { withCredentials: true });
                const newToken = res.data.access;
                
                setAccessToken(newToken);
                isRefreshing = false;
                onRefreshed(newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest); 
            } catch (refreshError) {
                isRefreshing = false;
                setAccessToken(null);
                localStorage.removeItem('user');
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;