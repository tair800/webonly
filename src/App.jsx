import React from 'react';
import './App.css';
import Navbar from './Navbar';
import Footer from './Footer';
import AboutUs from './AboutUs';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about-us" element={<AboutUs />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

function Home() {
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Welcome to WebOnly</h1>
            <p>This is the home page content.</p>
        </div>
    );
}

export default App; 