import React, { useState } from 'react';
import './Services.css';

function Services() {
    const [services] = useState([
        { id: 1, name: "Bazanın arxivlənməsi", subtitle: "Arxivləmə", icon: "/src/assets/service1.png" },
        { id: 2, name: "Logların saxlanılması", subtitle: "Loglama", icon: "/src/assets/service2.png" },
        { id: 3, name: "Hesabatların e-poçt göndərilməsi", subtitle: "E-poçt", icon: "/src/assets/service3.png" },
        { id: 4, name: "Mobil hesabatlar", subtitle: "Mobil hesabatlar", icon: "/src/assets/service4.png" },
        { id: 5, name: "Bazanın nüsxəsinin alınması", subtitle: "Nüsxələmə", icon: "/src/assets/service5.png" },
        { id: 6, name: "Bonus modulunun tətbiqi", subtitle: "Bonus modulu", icon: "/src/assets/service6.png" },
        { id: 7, name: "Hesabatların hazırlanması", subtitle: "Hesabatlar", icon: "/src/assets/service7.png" },
        { id: 8, name: "Əməliyyat sisteminin yazılması", subtitle: "Əməliyyat sistemi", icon: "/src/assets/service8.png" },
        { id: 9, name: "Sistemin audit olunması", subtitle: "Audit", icon: "/src/assets/service9.png" }
    ]);

    return (
        <div className="services-container">
            <div className="services-center">
                <div className="services-logo">
                    <img src="/src/assets/logo-white.png" alt="Logo" />
                </div>
                <div className="services-text">
                    <p>Xidmətlər</p>
                </div>
                <div className="services-rainbow">
                    <img src="/src/assets/rainbow.png" alt="Rainbow" />
                </div>

                {/* Services Cards Section */}
                <div className="card-section">
                    {services.map((service) => (
                        <div key={service.id} className="card-border-wrapper">
                            <div className="mobile-card">
                                <img src={service.icon} alt={service.name} className="icon" />
                                <div className="card-text-content">
                                    <div className="card-title">{service.name}</div>
                                    <div className="card-subtitle">{service.subtitle}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Services;
