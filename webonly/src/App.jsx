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
import Market from './Market';
import Textile from './Textile';
import Restaurant from './Restaurant';
import Mobile from './Mobile';
import Medicine from './Medicine';
import Factory from './Factory';
import Credit from './Credit';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/equipment/:id" element={<EquipmentDetail />} />
            <Route path="/products" element={<Products />} />
            <Route path="/market" element={<Market />} />
            <Route path="/textile" element={<Textile />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/mobile" element={<Mobile />} />
            <Route path="/medicine" element={<Medicine />} />
            <Route path="/factory" element={<Factory />} />
            <Route path="/credit" element={<Credit />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
