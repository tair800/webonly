import React, { useRef, useEffect, useState } from 'react';
import './TestPage.css';

function TestPage() {
    const scrollerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        { src: "/assets/slider1.png", alt: "Slider 1" },
        { src: "/assets/slider2.png", alt: "Slider 2" },
        { src: "/assets/slider3.png", alt: "Slider 3" },
        { src: "/assets/slider4.png", alt: "Slider 4" },
        { src: "/assets/slider5.png", alt: "Slider 5" },
        { src: "/assets/slider6.png", alt: "Slider 6" }
    ];

    const [imageWidth, setImageWidth] = useState(window.innerWidth / 3);

    // Update image width on window resize
    useEffect(() => {
        const handleResize = () => {
            setImageWidth(window.innerWidth / 3);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToImage = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (scrollerRef.current) {
            const scrollPosition = currentIndex * imageWidth;
            scrollerRef.current.style.transform = `translateX(-${scrollPosition}px)`;
        }
    }, [currentIndex, imageWidth]);

    return (
        <div className="test-page-container">
            <div className="test-page-content">
                <h1>Horizontal Image Scroller</h1>
                <p>Exactly 3 images visible at a time</p>

                <div className="slider-container">
                    <div className="top-ellipse">
                        <svg className="ellipse-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 1920 147">
                            <ellipse cx="960" cy="73.5" fill="#111214" rx="960" ry="73.5" />
                        </svg>
                    </div>

                    <div className="image-scroller-wrapper">
                        <div className="image-scroller-container">
                            <div
                                ref={scrollerRef}
                                className="image-scroller"
                                style={{ width: `${images.length * imageWidth}px` }}
                            >
                                {[...images, ...images, ...images].map((image, index) => (
                                    <div
                                        key={`${index}-${image.alt}`}
                                        className="image-slide"
                                        style={{
                                            width: `${imageWidth}px`,
                                            backgroundImage: `url('${image.src}')`
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bottom-ellipse">
                        <svg className="ellipse-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 1920 147">
                            <ellipse cx="960" cy="73.5" fill="#111214" rx="960" ry="73.5" />
                        </svg>
                    </div>
                </div>

                <div className="slider-info">
                    <p>Current Image: {currentIndex + 1} of {images.length}</p>

                    <div className="slider-navigation">
                        <button className="nav-button prev-button" onClick={goToPrevious}>← Previous</button>

                        <div className="dot-navigation">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    className={`dot-button ${index === currentIndex ? 'active' : ''}`}
                                    onClick={() => goToImage(index)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        <button className="nav-button next-button" onClick={goToNext}>Next →</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestPage;
