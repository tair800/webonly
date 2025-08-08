import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminAbout from './AdminAbout';
import AdminProducts from './AdminProducts';
import AdminEquipment from './AdminEquipment';
import AdminServices from './AdminServices';
import './AdminPanel.css';

function AdminPanel() {
    return (
        <div className="admin-panel-container" style={{ display: 'flex' }}>
            <div style={{ flex: '0 0 280px' }}>
                <AdminSidebar />
            </div>
            <div style={{ flex: 1 }}>
                <Routes>
                    <Route path="/" element={<div />} />
                    <Route path="/about" element={<AdminAbout />} />
                    <Route path="/products" element={<AdminProducts />} />
                    <Route path="/equipment" element={<AdminEquipment />} />
                    <Route path="/services" element={<AdminServices />} />
                    <Route path="/test" element={<div />} />
                </Routes>
            </div>
        </div>
    );
}

export default AdminPanel; 