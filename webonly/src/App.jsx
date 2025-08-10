import React from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import About from './About';
import Home from './Home';
import Contact from './Contact';
import Services from './Services';
import Equipment from './Equipment';
import EquipmentDetail from './EquipmentDetail';
import ServiceDetail from './ServiceDetail';
import Products from './Products';
import Factory from './Factory';
import ProductDetail from './ProductDetail';
import TestPage from './TestPage';
import AdminPanel from './AdminPanel';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Admin Panel Routes - Protected, No Header/Footer */}
          <Route path="/admin-panel/*" element={
            <ProtectedRoute requireAdmin={false}>
              <AdminPanel />
            </ProtectedRoute>
          } />

          {/* Login Route - No Header/Footer */}
          <Route path="/login" element={<Login />} />

          {/* Register Route - No Header/Footer */}
          <Route path="/register" element={<Register />} />

          {/* Forgot Password Route - No Header/Footer */}
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Reset Password Route - No Header/Footer */}
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Home Route - With Header Only */}
          <Route path="/" element={
            <>
              <Header />
              <div style={{ flex: 1 }}>
                <Home />
              </div>
            </>
          } />

          {/* Other Main App Routes - With Header/Footer */}
          <Route path="/*" element={
            <>
              <Header />
              <div style={{ flex: 1 }}>
                <Routes>
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:id" element={<ServiceDetail />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/equipment" element={<Equipment />} />
                  <Route path="/equipment/:id" element={<EquipmentDetail />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/factory" element={<Factory />} />
                  <Route path="/test" element={<TestPage />} />
                </Routes>
              </div>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
