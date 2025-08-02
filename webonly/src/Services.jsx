import React from 'react';
import { useNavigate } from 'react-router-dom';
import { servicesList } from './data/servicesData.js';
import './Services.css';

function Services() {
    const navigate = useNavigate();
    const services = servicesList;

    return (
        <div className="services-container">
            <div className="services-circle-background-1"></div>
            <div className="services-circle-background-2"></div>
            <div className="services-circle-background-3"></div>

            <div className="services-center">
                <div className="services-logo">
                    <img src="/assets/logo-white.png" alt="Logo" />
                </div>
                <div className="services-text">
                    <p>Xidmətlər</p>
                </div>
                <div className="services-rainbow">
                    <img src="/assets/rainbow.png" alt="Rainbow" />
                </div>

                <div className="card-section">
                    {services.map((service) => (
                        <div key={service.id} className="card-border-wrapper" onClick={() => navigate(`/services/${service.id}`)}>
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
