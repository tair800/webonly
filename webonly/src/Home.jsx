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

const slides = [
    { id: 1, img: slider1 },
    { id: 2, img: slider2 },
    { id: 3, img: slider3 },
    { id: 4, img: slider4 },
    { id: 5, img: slider5 },
    { id: 6, img: slider6 }
];

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance slider with infinite loop
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    return (
        <div className="home-container">
            <div className="slider-container">
                <div className="slider-track">
                    {[0, 1, 2].map((position) => {
                        const slideIndex = (currentIndex + position) % slides.length;
                        const isActive = position === 1;
                        const isSide = position === 0 || position === 2;

                        return (
                            <div
                                key={`${currentIndex}-${position}`}
                                className={`slider-slide ${isActive ? 'active' : ''} ${isSide ? 'side' : ''}`}
                                style={{
                                    backgroundImage: `url(${slides[slideIndex].img})`
                                }}
                            />
                        );
                    })}
                </div>

                <button className="nav-btn prev-btn" onClick={prevSlide}>
                    <img src={prevIcon} alt="Previous" className="nav-icon" />
                </button>

                <button className="nav-btn next-btn" onClick={nextSlide}>
                    <img src={nextIcon} alt="Next" className="nav-icon" />
                </button>
            </div>
        </div>
    );
} 