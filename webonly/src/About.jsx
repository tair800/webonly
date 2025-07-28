import React, { useState, useRef, useEffect } from 'react';
import './About.css';

function About() {
    const [teamMembers] = useState([
        {
            id: 1,
            name: "Name Surname",
            position: "Baş proqram tərtibatçısı",
            image: "/src/assets/employee.png",
            phone: "+994 50 123 45 67",
            email: "developer@company.com",
            linkedin: "linkedin.com/in/developer"
        },
        {
            id: 2,
            name: "Name Surname",
            position: "Layihə koordinatoru",
            image: "/src/assets/employee.png",
            phone: "+994 50 123 45 68",
            email: "coordinator@company.com",
            linkedin: "linkedin.com/in/coordinator"
        },
        {
            id: 3,
            name: "Name Surname",
            position: "Baş proqramçı",
            image: "/src/assets/employee.png",
            phone: "+994 50 123 45 69",
            email: "programmer@company.com",
            linkedin: "linkedin.com/in/programmer"
        },
        {
            id: 4,
            name: "Name Surname",
            position: "IT mütəxəssisi",
            image: "/src/assets/employee.png",
            phone: "+994 50 123 45 70",
            email: "specialist@company.com",
            linkedin: "linkedin.com/in/specialist"
        },
        {
            id: 5,
            name: "Name Surname",
            position: "Layihələr üzrə şöbə rəhbəri",
            image: "/src/assets/employee.png",
            phone: "+994 50 123 45 71",
            email: "manager@company.com",
            linkedin: "linkedin.com/in/manager"
        },
        {
            id: 6,
            name: "Name Surname",
            position: "Layihə meneceri",
            image: "/src/assets/employee.png",
            phone: "+994 50 123 45 72",
            email: "project-manager@company.com",
            linkedin: "linkedin.com/in/project-manager"
        },
        {
            id: 7,
            name: "Name Surname",
            position: "SQL Server üzrə proqramçı",
            image: "/src/assets/employee.png",
            phone: "+994 50 123 45 73",
            email: "sql-developer@company.com",
            linkedin: "linkedin.com/in/sql-developer"
        }

    ]);

    const [logos] = useState([
        {
            id: 1,
            name: "Logo 1",
            image: "/src/assets/logo1.png",
            alt: "Company Logo 1"
        },
        {
            id: 2,
            name: "Logo 2",
            image: "/src/assets/logo2.png",
            alt: "Company Logo 2"
        },
        {
            id: 3,
            name: "Logo 3",
            image: "/src/assets/logo3.png",
            alt: "Company Logo 3"
        },
        {
            id: 4,
            name: "Logo 4",
            image: "/src/assets/logo4.png",
            alt: "Company Logo 4"
        },
        {
            id: 5,
            name: "Logo 5",
            image: "/src/assets/logo5.png",
            alt: "Company Logo 5"
        },
        {
            id: 6,
            name: "Logo 6",
            image: "/src/assets/logo6.png",
            alt: "Company Logo 6"
        },
        {
            id: 7,
            name: "Logo 7",
            image: "/src/assets/logo7.png",
            alt: "Company Logo 7"
        },
        {
            id: 8,
            name: "Logo 8",
            image: "/src/assets/logo8.png",
            alt: "Company Logo 8"
        },
        {
            id: 9,
            name: "Logo 9",
            image: "/src/assets/logo9.png",
            alt: "Company Logo 9"
        },
        {
            id: 10,
            name: "Logo 10",
            image: "/src/assets/logo10.png",
            alt: "Company Logo 10"
        },
        {
            id: 11,
            name: "Logo 11",
            image: "/src/assets/logo11.png",
            alt: "Company Logo 11"
        },
        {
            id: 12,
            name: "Logo 12",
            image: "/src/assets/logo12.png",
            alt: "Company Logo 12"
        },
        {
            id: 13,
            name: "Logo 13",
            image: "/src/assets/logo13.png",
            alt: "Company Logo 13"
        },
        {
            id: 14,
            name: "Logo 14",
            image: "/src/assets/logo14.png",
            alt: "Company Logo 14"
        },
        {
            id: 15,
            name: "Logo 15",
            image: "/src/assets/logo15.png",
            alt: "Company Logo 15"
        },
        {
            id: 16,
            name: "Logo 16",
            image: "/src/assets/logo16.png",
            alt: "Company Logo 16"
        },
        {
            id: 17,
            name: "Logo 17",
            image: "/src/assets/logo17.png",
            alt: "Company Logo 17"
        },
        {
            id: 18,
            name: "Logo 18",
            image: "/src/assets/logo18.png",
            alt: "Company Logo 18"
        },
        {
            id: 19,
            name: "Logo 19",
            image: "/src/assets/logo19.png",
            alt: "Company Logo 19"
        },
        {
            id: 20,
            name: "Logo 20",
            image: "/src/assets/logo20.png",
            alt: "Company Logo 20"
        },
        {
            id: 21,
            name: "Logo 21",
            image: "/src/assets/logo21.png",
            alt: "Company Logo 21"
        },
        {
            id: 22,
            name: "Logo 22",
            image: "/src/assets/logo22.png",
            alt: "Company Logo 22"
        },
        {
            id: 23,
            name: "Logo 23",
            image: "/src/assets/logo23.png",
            alt: "Company Logo 23"
        },
        {
            id: 24,
            name: "Logo 24",
            image: "/src/assets/logo24.png",
            alt: "Company Logo 24"
        },
        {
            id: 25,
            name: "Logo 25",
            image: "/src/assets/logo25.png",
            alt: "Company Logo 25"
        }
    ]);

    // Update CSS custom properties for dynamic animation
    useEffect(() => {
        const logoCount = logos.length;
        const root = document.documentElement;
        root.style.setProperty('--logo-count', logoCount);
        root.style.setProperty('--carousel-width', `calc(200px * ${logoCount * 2})`);
        root.style.setProperty('--animation-duration', `${Math.max(30, logoCount * 2)}s`);
    }, [logos]);



    return (
        <div className="about-container">
            <div className="about-logo-top">
                <img src="/src/assets/logo-white.png" alt="Logo" />
            </div>
            <div className="about-text">
                <p>Haqqımızda</p>
            </div>
            <div className="about-rainbow">
                <img src="/src/assets/rainbow.png" alt="Rainbow" />
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

            <div className="about-team-cards">
                {teamMembers.map((member) => (
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
                                    <img src="/src/assets/mail-icon.png" alt="Email" />
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
                        {/* First set of logos */}
                        {logos.map((logo) => (
                            <div key={`first-${logo.id}`} className="logo-item">
                                <img src={logo.image} alt={logo.alt} />
                            </div>
                        ))}
                        {/* Duplicate set for seamless infinite scroll */}
                        {logos.map((logo) => (
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