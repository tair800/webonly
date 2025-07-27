import React from 'react';
import './About.css';

export default function About() {
    return (
        <div className="about-container">
            <div className="about-center">
                <div className="about-logo">
                    <img src="/src/assets/logo-white.png" alt="Logo" />
                </div>
                <div className="about-text">
                    <p>Haqqımızda</p>
                </div>
                <div className="about-rainbow">
                    <img src="/src/assets/rainbow.png" alt="Rainbow" />
                </div>
            </div>
        </div>
    );
} 