import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Test from './Test';
import './App.css';

function App() {
    return (
        <Router>
            <div className="admin-app">
                <nav className="admin-nav">
                    <div className="admin-nav-brand">
                        <h1>Admin Panel</h1>
                    </div>
                    <ul className="admin-nav-links">
                        <li><Link to="/">Dashboard</Link></li>
                        <li><Link to="/test">Test Page</Link></li>
                    </ul>
                </nav>

                <main className="admin-main">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/test" element={<Test />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

// Dashboard component
function Dashboard() {
    return (
        <div className="admin-dashboard">
            <div className="admin-dashboard-header">
                <h1>Admin Dashboard</h1>
                <p>Welcome to the admin panel</p>
            </div>

            <div className="admin-dashboard-content">
                <div className="admin-card">
                    <h2>Quick Actions</h2>
                    <div className="admin-actions">
                        <button className="admin-btn">Manage Users</button>
                        <button className="admin-btn">View Analytics</button>
                        <button className="admin-btn">Settings</button>
                    </div>
                </div>

                <div className="admin-card">
                    <h2>Recent Activity</h2>
                    <p>No recent activity to display</p>
                </div>
            </div>
        </div>
    );
}

export default App; 