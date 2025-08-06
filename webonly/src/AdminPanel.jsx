import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AdminDashboard from './admin-panel/src/AdminDashboard';
import AdminTest from './admin-panel/src/Test';
import './AdminPanel.css';

function AdminPanel() {
    return (
        <div className="admin-panel-container">
            <nav className="admin-nav">
                <div className="admin-nav-brand">
                    <h1>Admin Panel</h1>
                </div>
                <ul className="admin-nav-links">
                    <li><Link to="/admin-panel">Dashboaard</Link></li>
                    <li><Link to="/admin-panel/test">Test Page</Link></li>
                </ul>
            </nav>

            <main className="admin-main">
                <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/test" element={<AdminTest />} />
                </Routes>
            </main>
        </div>
    );
}

export default AdminPanel; 