import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api, { setAccessToken } from '../api/axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = useCallback(async () => {
        try {
 
            const refresh = await api.post('/auth/refresh/');
            setAccessToken(refresh.data.access);

            const res = await api.get('/auth/me/');
            const userData = { ...res.data.user, cartId: res.data.cart?.id };
            setUser(userData);
        } catch (err) {
            console.log("Session not found or expired");
            setUser(null);
        } finally {
            setLoading(false); 
        }
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const login = (data) => {
        setAccessToken(data.access);
        setUser(data.user);
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, checkAuth, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);