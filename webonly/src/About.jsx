import React, { useState, useRef, useEffect } from 'react';
import { teamMembers } from './data/teamData';
import { logos } from './data/logoData';
import Spline from '@splinetool/react-spline';
import './About.css';

function About() {
    const [teamMembersState] = useState(teamMembers);
    const [logosState] = useState(logos);
    const [splineError, setSplineError] = useState(false);

    // Update CSS custom properties for dynamic animation
    useEffect(() => {
        const logoCount = logosState.length;
        const root = document.documentElement;
        root.style.setProperty('--logo-count', logoCount);
        root.style.setProperty('--carousel-width', `calc(200px * ${logoCount * 2})`);
        root.style.setProperty('--animation-duration', `${Math.max(30, logoCount * 2)}s`);
    }, [logosState]);



    return (
        <div className="about-container">
            <div className="about-circle-background"></div>
            <div className="about-circle-background-left-2"></div>
            <div className="about-circle-background-right"></div>
            <div className="about-circle-background-right-2"></div>

            <div className="about-rainbow">
                {!splineError ? (
                    <Spline
                        scene="https://prod.spline.design/mP2TljaQ-tsNIzZt/scene.splinecode"
                        onError={(error) => {
                            console.log('Spline error:', error);
                            setSplineError(true);
                        }}
                    />
                ) : (
                    <div className="spline-fallback">
                        <img src="/assets/rainbow.png" alt="Rainbow" />
                    </div>
                )}
            </div>

            <div className="about-logo">
                <img src="/assets/logo-only.png" alt="Logo" />
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
                <img src="/assets/director.png" alt="Director" className="about-director-img" />
                <div className="about-name">Name Surname</div>
                <div className="about-position">director</div>
                <div>
                    <p className="about-description-text">10 illik təcrübəsi ilə ERP proqramlarının tətbiqi və avadanlıq satışı sahəsində fəaliyyət göstərir. 500-dən çox uğurlu layihə, restoranlardan istehsalat müəssisələrinə qədər geniş spektrli bizneslərin avtomatlaşdırılması və POS CLASS, POS TÜRK avadanlıqlarının rəsmi nümayəndəliyi ilə bazarda lider mövqedədir.</p>
                    <img src="/assets/comma.png" alt="Comma" className="about-comma" />
                </div>
            </div>

            <div className="about-team-cards">
                {teamMembersState.map((member) => (
                    <div key={member.id} className="team-card">
                        <div className="card-image">
                            <img src={member.image} alt={member.name} />
                        </div>
                        <div className="card-content">
                            <div className="card-name">{member.name}</div>
                            <div className="card-position">{member.position}</div>
                            <div className="card-contacts">
                                <a href={`tel:${member.phone}`}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="rgba(0, 123, 255, 1)" />
                                    </svg>
                                </a>
                                <a href={`mailto:${member.email}`}>
                                    <img src="/assets/mail-icon.png" alt="Email" />
                                </a>
                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="rgba(0, 123, 255, 1)" />
                                        <rect x="2" y="9" width="4" height="12" fill="rgba(0, 123, 255, 1)" />
                                        <circle cx="4" cy="4" r="2" fill="rgba(0, 123, 255, 1)" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="about-team-header">
                <div className="about-team-title">Referance</div>
                <div className="about-team-nav">
                    <div className="about-team-nav-dot about-team-nav-dot-faded"></div>
                    <div className="about-team-nav-dot about-team-nav-dot-gradient"></div>
                    <div className="about-team-divider"></div>
                    <div className="about-team-bar"></div>
                </div>
            </div>

            <div className="logo-carousel-container">
                <div className="logo-carousel">
                    <div className="logo-carousel-track">
                        {logosState.map((logo) => (
                            <div key={`first-${logo.id}`} className="logo-item">
                                <img src={logo.image} alt={logo.alt} />
                            </div>
                        ))}
                        {logosState.map((logo) => (
                            <div key={`second-${logo.id}`} className="logo-item">
                                <img src={logo.image} alt={logo.alt} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About; 