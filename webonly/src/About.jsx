import React from 'react';
import './About.css';

export default function About() {
    return (
        <div className="about-container">
            <div className="about-center">
                <div className="about-logo-top">
                    <img src="/src/assets/logo-white.png" alt="Logo" />
                </div>
                <div className="about-text">
                    <p>Haqqımızda</p>
                </div>
                <div className="about-rainbow">
                    <img src="/src/assets/rainbow.png" alt="Rainbow" />
                </div>
            </div>
            <div className="about-logo">
                <img src="/src/assets/logo-only.png" alt="Logo" />
                <p className="about-logo-text">Texnologiya ilə Gələcəyə Doğru</p>
                <p className="about-logo-description">10 illik təcrübəsi ilə ERP proqramlarının tətbiqi və avadanlıq satışı sahəsində fəaliyyət göstərir. 500-dən çox uğurlu layihə, restoranlardan istehsalat müəssisələrinə qədər geniş spektrli bizneslərin avtomatlaşdırılması və POS CLASS, POS TÜRK avadanlıqlarının rəsmi nümayəndəliyi ilə bazarda lider mövqedədir.</p>
            </div>
            <div className="about-team-header">
                <div className="about-team-title">Kollektiv</div>
                <div className="about-team-nav">
                    <div className="about-team-nav-dot about-team-nav-dot-faded"></div>
                    <div className="about-team-nav-dot about-team-nav-dot-gradient"></div>
                    <div className="about-team-divider"></div>
                    <div className="about-team-bar"></div>
                </div>
            </div>
            <div className="about-description-section">
                <img src="/src/assets/director.png" alt="Director" className="about-director-img" />
                <div className="about-name">Name Surname</div>
                <div className="about-position">director</div>
                <div>
                    <p className="about-description-text">
                        10 illik təcrübəsi ilə ERP proqramlarının tətbiqi və avadanlıq satışı sahəsində fəaliyyət göstərir. 500-dən çox uğurlu layihə, restoranlardan istehsalat müəssisələrinə qədər geniş spektrli bizneslərin avtomatlaşdırılması və POS CLASS, POS TÜRK avadanlıqlarının rəsmi nümayəndəliyi ilə bazarda lider mövqedədir.
                    </p>
                    <img src="/src/assets/comma.png" alt="Comma" className="about-comma" />
                </div>
            </div>
        </div>
    );
} 