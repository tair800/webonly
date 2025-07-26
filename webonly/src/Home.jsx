import React, { useState, useEffect } from 'react';
import './Home.css';
import slider1 from './assets/slider1.png';
import slider2 from './assets/slider2.png';
import slider3 from './assets/slider3.png';
import slider4 from './assets/slider4.png';
import slider5 from './assets/slider5.png';
import slider6 from './assets/slider6.png';
import prevIcon from './assets/prev.png';
import nextIcon from './assets/next.png';
import logoIcon from './assets/logo-icon.png';

const slides = [
    { id: 1, img: slider1, name: 'slider1' },
    { id: 2, img: slider2, name: 'slider2' },
    { id: 3, img: slider3, name: 'slider3' },
    { id: 4, img: slider4, name: 'slider4' },
    { id: 5, img: slider5, name: 'slider5' },
    { id: 6, img: slider6, name: 'slider6' }
];

function CircularProgress({ currentIndex, totalSlides }) {
    const radius = 160; // Circle radius (increased from 120)
    const centerX = 200; // Center X coordinate (increased from 150)
    const centerY = 200; // Center Y coordinate (increased from 150)

    // Calculate rotation angle to keep active slider at top
    const rotationAngle = -(currentIndex * 360 / totalSlides);

    return (
        <div className="circular-progress">
            {/* Logo icon - positioned outside the rotating SVG so it doesn't rotate */}
            <div className="circle-logo">
                <img src={logoIcon} alt="Logo" className="circle-logo-icon" />
            </div>

            <svg
                width="400"
                height="400"
                viewBox="0 0 400 400"
                style={{
                    transform: `rotate(${rotationAngle}deg)`,
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
            >
                {/* Gradient definition for border */}
                <defs>
                    <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="22.5%" stopColor="rgba(0, 123, 255, 0.7)" />
                        <stop offset="80.89%" stopColor="rgba(23, 219, 252, 0.7)" />
                    </linearGradient>
                </defs>

                {/* Circle border */}
                <circle
                    cx={centerX}
                    cy={centerY}
                    r={radius}
                    fill="none"
                    stroke="url(#circleGradient)"
                    strokeWidth="4"
                    className="progress-circle"
                />

                {/* Slider names positioned around the circle */}
                {slides.map((slide, index) => {
                    const angle = (index * 360 / totalSlides - 90) * (Math.PI / 180); // Start from top
                    const textRadius = radius + 45; // Text positioned outside the circle (increased from 35)
                    const x = centerX + textRadius * Math.cos(angle);
                    const y = centerY + textRadius * Math.sin(angle);
                    const isActive = index === currentIndex;

                    return (
                        <text
                            key={slide.id}
                            x={x}
                            y={y}
                            className={`slider-name ${isActive ? 'active' : ''}`}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{
                                transform: `rotate(${angle * 180 / Math.PI + 90}deg)`,
                                transformOrigin: `${x}px ${y}px`
                            }}
                        >
                            {slide.name}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
}

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [direction, setDirection] = useState('next');

    // Auto-advance slider with infinite loop
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isTransitioning) {
                setDirection('next');
                setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [isTransitioning]);

    const nextSlide = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setDirection('next');
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);

            setTimeout(() => {
                setIsTransitioning(false);
            }, 600);
        }
    };

    const prevSlide = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setDirection('prev');
            setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);

            setTimeout(() => {
                setIsTransitioning(false);
            }, 600);
        }
    };

    return (
        <div className="home-container">
            <div className="slider-container">
                <div className={`slider-track ${isTransitioning ? 'transitioning' : ''} ${direction}`}>
                    {[0, 1, 2].map((position) => {
                        const slideIndex = (currentIndex + position) % slides.length;
                        const isActive = position === 1;
                        const isSide = position === 0 || position === 2;

                        return (
                            <div
                                key={`${currentIndex}-${position}-${slideIndex}`}
                                className={`slider-slide ${isActive ? 'active' : ''} ${isSide ? 'side' : ''} ${isTransitioning ? 'animating' : ''}`}
                                style={{
                                    backgroundImage: `url(${slides[slideIndex].img})`
                                }}
                            />
                        );
                    })}
                </div>

                <button className="nav-btn prev-btn" onClick={prevSlide} disabled={isTransitioning}>
                    <img src={prevIcon} alt="Previous" className="nav-icon" />
                </button>

                <button className="nav-btn next-btn" onClick={nextSlide} disabled={isTransitioning}>
                    <img src={nextIcon} alt="Next" className="nav-icon" />
                </button>

                <CircularProgress currentIndex={currentIndex} totalSlides={slides.length} />
            </div>
        </div>
    );
} 