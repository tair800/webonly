import React from 'react';
import { servicesList } from './data/servicesData.js';
import ServiceCard3D from './components/ServiceCard3D';
import './Services.css';

function Services() {
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

                <div className="services-grid-3d">
                    {services.map((service) => (
                        <div key={service.id} className="service-card-3d-wrapper">
                            <ServiceCard3D service={service} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Services;
