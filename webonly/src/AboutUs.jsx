import React from 'react';
import personImg from './assets/person.png';
import logoIcon from './assets/logo-icon.png';
import './AboutUs.css';

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

export default function AboutUs() {
    return (
        <div className="aboutus-bg-rects-wrapper">
            <div className="aboutus-bg-rect aboutus-bg-rect-left"></div>
            <div className="aboutus-bg-rect aboutus-bg-rect-right"></div>
            <AboutUsHeader />
            <div className="aboutus-highlight-row-fixed">
                <div className="aboutus-highlight-card-fixed">
                    <div className="aboutus-highlight-card-left">
                        <p className="aboutus-highlight-card-text-fixed">
                            Texnologiya sahəsində 15 ilə yaxın təcrübəyə malik olan Name Surname, şirkətin qurucusu və direktorudur. Onun rəhbərliyi ilə şirkət yüzlərlə ERP layihəsini uğurla həyata keçirmiş, həm kiçik, həm də böyük müəssisələrin rəqəmsallaşmasına töhfə vermişdir. Əsas məqsəd – yerli bazarda beynəlxalq standartlara uyğun texnoloji həllər təqdim etmək və müştəri məmnuniyyətini daim ön planda tutmaqdır.
                        </p>
                        <div className="aboutus-highlight-quote-icon-fixed">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.333 28.333c0-3.682 2.985-6.667 6.667-6.667M6.667 28.333c0-7.364 5.97-13.333 13.333-13.333M33.333 28.333c0-3.682-2.985-6.667-6.667-6.667M26.667 28.333c0-7.364 5.97-13.333 13.333-13.333" stroke="#A3B8CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <div className="aboutus-highlight-card-right">
                        <img src={logoIcon} alt="Logo Watermark" className="aboutus-watermark-fixed" />
                        <div className="aboutus-highlight-name-title-fixed">
                            <span className="aboutus-highlight-username-fixed">Name Surname</span>
                            <span className="aboutus-highlight-role-fixed">Direktor</span>
                        </div>
                    </div>
                    <div className="aboutus-img-arch-shape-fixed aboutus-img-arch-inside">
                        <img src={personImg} alt="Person" className="aboutus-img-arch-img-fixed" />
                    </div>
                </div>
            </div>
        </div>
    );
} 