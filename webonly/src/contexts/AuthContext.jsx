import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('AuthContext: Checking for existing authentication on mount');
        // Check for existing token and user data on app load
        const storedToken = localStorage.getItem('adminToken');
        const storedUser = localStorage.getItem('adminUser');
        const tokenExpiresAt = localStorage.getItem('tokenExpiresAt');

        console.log('AuthContext: Stored data:', {
            hasToken: !!storedToken,
            hasUser: !!storedUser,
            hasExpiry: !!tokenExpiresAt
        });

        if (storedToken && storedUser && tokenExpiresAt) {
            const expiresAt = new Date(tokenExpiresAt);
            if (expiresAt > new Date()) {
                // Token is still valid
                console.log('AuthContext: Restoring authentication from storage');
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            } else {
                // Token has expired, clear storage
                console.log('AuthContext: Token expired, clearing storage');
                logout();
            }
        } else {
            console.log('AuthContext: No stored authentication found');
        }
        setLoading(false);
    }, []);

    const login = (userData, token, expiresAt) => {
        console.log('AuthContext: Login called with:', { userData, token, expiresAt });
        setUser(userData);
        setToken(token);
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(userData));
        if (expiresAt) {
            localStorage.setItem('tokenExpiresAt', expiresAt);
        }
        console.log('AuthContext: State updated, user:', userData, 'token:', token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        localStorage.removeItem('tokenExpiresAt');
    };

    const isAuthenticated = () => {
        // Check if we have both token and user, and if token hasn't expired
        if (!token || !user) {
            console.log('AuthContext: Not authenticated - missing token or user:', { token: !!token, user: !!user });
            return false;
        }

        const tokenExpiresAt = localStorage.getItem('tokenExpiresAt');
        if (tokenExpiresAt) {
            const expiresAt = new Date(tokenExpiresAt);
            if (expiresAt <= new Date()) {
                console.log('AuthContext: Token expired, logging out');
                // Token has expired, logout
                logout();
                return false;
            }
        }

        console.log('AuthContext: Authenticated successfully');
        return true;
    };

    const getAuthHeaders = () => {
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    };

    const value = {
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated,
        getAuthHeaders
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
