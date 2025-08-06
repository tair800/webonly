import React, { useState } from 'react';
import { servicesList } from './data/servicesData.js';
import ServiceCard3D from './components/ServiceCard3D';
import Spline from '@splinetool/react-spline';
import './Services.css';

function Services() {
    const services = servicesList;
    const [splineError, setSplineError] = useState(false);

    return (
        <div className="services-container">
            <div className="services-circle-background-1"></div>
            <div className="services-circle-background-2"></div>
            <div className="services-circle-background-3"></div>

            <div className="services-center">
                <div className="services-rainbow">
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
