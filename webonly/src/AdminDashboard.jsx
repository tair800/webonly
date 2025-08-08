import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminDashboard.css';
import logoWhite from '/assets/logo-white.png';
import logoIcon from '/assets/logo-icon.png';
import footerLogo from '/assets/footer-logo.png';

function AdminDashboard() {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div />
    );
}

export default AdminDashboard; 