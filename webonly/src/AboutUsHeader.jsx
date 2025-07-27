import React from 'react';
import './AboutUsHeader.css';

function AboutUsHeader() {
    return (
        <div className="aboutus-header-container">
            <div className="aboutus-header-title">Kollektiv</div>
            <div className="aboutus-header-nav">
                <div className="aboutus-header-nav-btn aboutus-header-nav-btn-faded"></div>
                <div className="aboutus-header-nav-btn aboutus-header-nav-btn-gradient"></div>
                <div className="aboutus-header-divider"></div>
                <div className="aboutus-header-search"></div>
            </div>
        </div>
    );
}

export default AboutUsHeader; 