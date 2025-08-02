import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from './data/productData.js';
import './ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id)) || products[0];
    const [currentSection, setCurrentSection] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef(null);
    const mainSectionRef = useRef(null);
    const firstSectionRef = useRef(null);
    const secondSectionRef = useRef(null);
    const thirdSectionRef = useRef(null);

    const sections = [
        { label: 'Start', value: 0 },
        { label: '01', value: 1 },
        { label: '02', value: 2 },
        { label: '03', value: 3 }
    ];

    const scrollToSection = (sectionIndex) => {
        setCurrentSection(sectionIndex);
        let targetRef;

        switch (sectionIndex) {
            case 0:
                // Start - scroll to main section
                targetRef = mainSectionRef.current;
                break;
            case 1:
                targetRef = firstSectionRef.current;
                break;
            case 2:
                targetRef = secondSectionRef.current;
                break;
            case 3:
                targetRef = thirdSectionRef.current;
                break;
            default:
                return;
        }

        if (targetRef) {
            targetRef.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleScrollDown = () => {
        scrollToSection(1); // Go to first section
    };

    // Scroller functions
    const handleMouseDown = (e) => {
        setIsDragging(true);
        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !sliderRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const height = rect.height;
        const newPosition = Math.max(0, Math.min(height - 60, y - 30));

        setScrollPosition(newPosition);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleSectionClick = (index) => {
        scrollToSection(index);
        const maxPosition = 180; // 240px track height - 60px indicator height
        const newPosition = (index / 3) * maxPosition;
        setScrollPosition(newPosition);
    };

    // Update scroller position when currentSection changes
    useEffect(() => {
        const maxPosition = 180; // 240px track height - 60px indicator height
        const newPosition = (currentSection / 3) * maxPosition;
        setScrollPosition(newPosition);
    }, [currentSection]);

    // Attach mouse events to document when dragging
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    // Force scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
        setCurrentSection(0);
    }, []);

    // Intersection Observer to detect which section is in view
    useEffect(() => {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '-10% 0px -10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.dataset.section;
                    setCurrentSection(parseInt(sectionId));
                }
            });
        }, observerOptions);

        // Observe all sections including main section
        const sections = [mainSectionRef.current, firstSectionRef.current, secondSectionRef.current, thirdSectionRef.current];
        sections.forEach((section, index) => {
            if (section) {
                section.dataset.section = index; // 0 for main, 1 for first, 2 for second, 3 for third
                observer.observe(section);
            }
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="product-detail-container">
            {/* Circle Background Elements */}
            <div className="product-detail-circle-background-1"></div>
            <div className="product-detail-circle-background-2"></div>

            <div className="product-detail-content">
                <div className="main-section" ref={mainSectionRef}>
                    <div className="main-left">
                        <div className="scroller-wrapper">
                            <div className="scroller-container">
                                {/* Text Labels */}
                                <div className="scroller-labels">
                                    {sections.map((section, index) => (
                                        <div
                                            key={section.label}
                                            className="scroller-label"
                                            onClick={() => handleSectionClick(index)}
                                        >
                                            <p>{section.label}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Slider Track */}
                                <div
                                    ref={sliderRef}
                                    className="scroller-track"
                                    onClick={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const y = e.clientY - rect.top;
                                        const newPosition = Math.max(0, Math.min(180, y - 30));
                                        setScrollPosition(newPosition);
                                    }}
                                />

                                {/* Slider Indicator */}
                                <div
                                    className="scroller-indicator"
                                    style={{ top: `${scrollPosition}px` }}
                                    onMouseDown={handleMouseDown}
                                />
                            </div>
                        </div>
                        <img
                            src={product.mainImage}
                            alt="Product"
                            className="product-detail-image"
                        />
                    </div>
                    <div className="main-right">
                        <h1 className="product-detail-title">{product.name}</h1>
                        <div className="product-detail-line"></div>
                        <p className="product-detail-description">
                            {product.description}
                        </p>
                        <div className="product-detail-scroll" onClick={handleScrollDown}>
                            <span>scroll down</span>
                            <img
                                src="/assets/arrowDown.png"
                                alt="Arrow down"
                                className="scroll-arrow"
                            />
                        </div>
                    </div>
                </div>
                <div className="first-section" ref={firstSectionRef}>
                    <div className="first-left">
                        <div className="first-content-container">
                            <div className="page-number-01">01</div>
                            <div className="first-tagline-container" data-name="Tagline">
                                <div className="first-tagline-line" data-name="Line"></div>
                            </div>
                            <div className="first-content-title">
                                <p className="block leading-[normal]">{product.sections[0].title}</p>
                            </div>
                            <div className="first-content-description">
                                <p className="block leading-[1.2]">
                                    {product.sections[0].description}
                                </p>
                            </div>
                            {product.sections[0].moreText && (
                                <div className="first-more-container" data-name="More">
                                    <div className="first-more-text">
                                        <p className="block mb-0">
                                            {product.sections[0].moreText}
                                        </p>
                                        <p className="block mb-0">&nbsp;</p>
                                        <p className="block">&nbsp;</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="first-right">
                        <img
                            src={product.sectionImages[0]}
                            alt="Section 1"
                            className="product-detail-image"
                        />
                    </div>
                </div>
                <div className="second-section" ref={secondSectionRef}>
                    <div className="second-left">
                        <img
                            src={product.sectionImages[1]}
                            alt="Section 2"
                            className="product-detail-image"
                        />
                    </div>
                    <div className="second-right">
                        <div className="second-content-container">
                            <div className="page-number-02">02</div>
                            <div className="second-tagline-container" data-name="Tagline">
                                <div className="second-tagline-line" data-name="Line"></div>
                            </div>
                            <div className="second-content-heading">
                                <p className="block leading-[normal]">{product.sections[1].title}</p>
                            </div>
                            <div className="second-content-description">
                                <p className="block leading-[1.2]">
                                    {product.sections[1].description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="third-section" ref={thirdSectionRef}>
                    <div className="third-left">
                        <div className="third-content-container">
                            <div className="page-number-03">03</div>
                            <div className="third-tagline-container" data-name="Tagline">
                                <div className="third-tagline-line" data-name="Line" />
                            </div>
                            <div className="third-main-title">
                                <p>{product.sections[2].title}</p>
                            </div>
                            {product.sections[2].moreText && (
                                <div className="third-more-container" data-name="More">
                                    <div className="third-more-text">
                                        <p>
                                            {product.sections[2].moreText}
                                        </p>
                                    </div>
                                </div>
                            )}
                            <div className="third-description-text">
                                <p>
                                    {product.sections[2].description}
                                </p>
                                <p>&nbsp;</p>
                            </div>
                        </div>
                    </div>
                    <div className="third-right">
                        <img
                            src={product.sectionImages[2]}
                            alt="Section 3"
                            className="product-detail-image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
