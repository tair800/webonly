import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    console.log('ProtectedRoute: loading:', loading, 'isAuthenticated:', isAuthenticated());

    if (loading) {
        // Show loading spinner while checking authentication
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '1.2rem',
                color: '#666'
            }}>
                Loading...
            </div>
        );
    }

    if (!isAuthenticated()) {
        console.log('ProtectedRoute: Not authenticated, redirecting to login');
        // Redirect to login page, saving the attempted location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    console.log('ProtectedRoute: Authenticated, rendering children');
    // User is authenticated, render the protected content
    return children;
}
