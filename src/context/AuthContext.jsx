import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api, { setAccessToken } from '../api/axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = useCallback(async () => {
        try {
            const res = await api.get('/auth/me/');
            const { user, cart } = res.data;
            const userData = { ...user, cartId: cart.id };
            
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (err) {
            setUser(null);
            localStorage.removeItem('user');
            setAccessToken(null);
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const login = (data) => {
        setAccessToken(data.access);
        const userData = data.user;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        checkAuth();
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, checkAuth, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);