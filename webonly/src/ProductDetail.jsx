import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
// Fetch from API instead of static data
import './ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentSection, setCurrentSection] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef(null);
    const mainSectionRef = useRef(null);
    const firstSectionRef = useRef(null);
    const secondSectionRef = useRef(null);
    const thirdSectionRef = useRef(null);

    const resolveUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('/uploads/')) return `http://localhost:5098${url}`;
        return url;
    };

    // Fetch product detail
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:5098/api/products/${id}`);
                if (!res.ok) throw new Error('Failed to load product');
                const data = await res.json();

                // Transform API data to match the expected structure
                const sections = [
                    {
                        title: data.section1Title || 'Section 1',
                        content: data.section1Content || 'Content for section 1',
                        image: data.section1Image ? resolveUrl(data.section1Image) : ''
                    },
                    {
                        title: data.section2Title || 'Section 2',
                        content: data.section2Content || 'Content for section 2',
                        image: data.section2Image ? resolveUrl(data.section2Image) : ''
                    },
                    {
                        title: data.section3Title || 'Section 3',
                        content: data.section3Content || 'Content for section 3',
                        image: data.section3Image ? resolveUrl(data.section3Image) : ''
                    }
                ];

                setProduct({
                    ...data,
                    sections: sections
                });
            } catch (e) {
                console.error(e);
            }
        };
        fetchProduct();
    }, [id]);

    // removed early returns here to avoid breaking hook order

    // Create dynamic sections based on the number of sections (stable reference)
    const sections = useMemo(() => {
        const s = [{ label: 'Start', value: 0 }];
        const sectionCount = (product && Array.isArray(product.sections)) ? product.sections.length : 0;
        for (let i = 0; i < sectionCount; i += 1) {
            s.push({ label: String(i + 1).padStart(2, '0'), value: i + 1 });
        }
        return s;
    }, [product]);

    const scrollToSection = (sectionIndex) => {
        setCurrentSection(sectionIndex);
        let targetRef;

        if (sectionIndex === 0) {
            // Start - scroll to main section
            targetRef = mainSectionRef.current;
        } else if (sectionIndex === 1) {
            targetRef = firstSectionRef.current;
        } else if (sectionIndex === 2) {
            targetRef = secondSectionRef.current;
        } else if (sectionIndex === 3) {
            targetRef = thirdSectionRef.current;
        } else {
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
        const maxSections = sections.length - 1; // Exclude Start section for calculation
        const trackHeight = sections.length * 60;
        const maxPosition = trackHeight - 60; // Track height - indicator height
        const newPosition = maxSections > 0 ? (index / maxSections) * maxPosition : 0;
        setScrollPosition(newPosition);
    };

    // Update scroller position when currentSection changes
    useEffect(() => {
        const maxSections = sections.length - 1; // Exclude Start section for calculation
        const trackHeight = sections.length * 60;
        const maxPosition = trackHeight - 60; // Track height - indicator height
        const newPosition = maxSections > 0 ? (currentSection / maxSections) * maxPosition : 0;
        setScrollPosition(newPosition);
    }, [currentSection, sections.length]);

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
        if (!product) return; // wait until product is loaded
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
        const sectionRefs = [mainSectionRef.current];

        // Add section refs based on the number of sections
        const count = product?.sections?.length || 0;
        if (count >= 1) sectionRefs.push(firstSectionRef.current);
        if (count >= 2) sectionRefs.push(secondSectionRef.current);
        if (count >= 3) sectionRefs.push(thirdSectionRef.current);

        sectionRefs.forEach((section, index) => {
            if (section) {
                section.dataset.section = index; // 0 for main, 1 for first, 2 for second, 3 for third
                observer.observe(section);
            }
        });

        return () => observer.disconnect();
    }, [product]);

    // Safe early returns AFTER all hooks have been called
    if (loading) {
        return <div className="product-detail-container"><div className="product-detail-content">Loading...</div></div>;
    }
    if (error || !product) {
        return <div className="product-detail-container"><div className="product-detail-content">{error || 'Not found'}</div></div>;
    }

    return (
        <div className="product-detail-container">
            <div className="product-detail-circle-background-1"></div>
            <div className="product-detail-circle-background-2"></div>

            <div className="product-detail-content">
                {/* Main Section */}
                <div className="main-section" ref={mainSectionRef}>
                    <div className="main-left">
                        <div className="scroller-wrapper">
                            <div className="scroller-container">
                                <div className="scroller-labels">
                                    {sections.map((section, index) => (
                                        <div key={section.label} className="scroller-label" onClick={() => handleSectionClick(index)}>
                                            <p>{section.label}</p>
                                        </div>
                                    ))}
                                </div>
                                <div ref={sliderRef} className="scroller-track" style={{ height: `${sections.length * 60}px` }} onClick={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const trackHeight = sections.length * 60;
                                    const y = e.clientY - rect.top;
                                    const newPosition = Math.max(0, Math.min(trackHeight - 60, y - 30));
                                    setScrollPosition(newPosition);
                                }} />
                                <div className="scroller-indicator" style={{ top: `${scrollPosition}px` }} onMouseDown={handleMouseDown} />
                            </div>
                        </div>
                        <img src={resolveUrl(product.mainImage)} alt="Product" className="product-detail-image" />

                    </div>
                    <div className="main-right">
                        <h1 className="product-detail-title">{product.name}</h1>
                        <div className="product-detail-line"></div>
                        <p className="product-detail-description">{product.description}</p>
                        <div className="product-detail-scroll" onClick={handleScrollDown}>
                            <span>scroll down</span>
                            <img src="/assets/arrowDown.png" alt="Arrow down" className="scroll-arrow" />
                        </div>
                    </div>
                </div>



                {/* Section 1 */}
                {product.sections?.length >= 1 && (
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
                                    <p className="block leading-[1.2]">{product.sections[0].content}</p>
                                </div>
                                {product.sections[0].moreText && (
                                    <div className="first-more-container" data-name="More">
                                        <div className="first-more-text">
                                            <p className="block mb-0">{product.sections[0].moreText}</p>
                                            <p className="block mb-0">&nbsp;</p>
                                            <p className="block">&nbsp;</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="first-right">
                            {product.sections[0].image && <img src={resolveUrl(product.sections[0].image)} alt="Section 1" className="product-detail-image" />}
                        </div>
                    </div>
                )}

                {/* Section 2 */}
                {product.sections?.length >= 2 && (
                    <div className="second-section" ref={secondSectionRef}>
                        <div className="second-left">
                            {product.sections[1].image && <img src={resolveUrl(product.sections[1].image)} alt="Section 2" className="product-detail-image" />}
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
                                    <p className="block leading-[1.2]">{product.sections[1].content}</p>
                                </div>
                                {product.sections[1].moreText && (
                                    <div className="second-more-container" data-name="More">
                                        <div className="second-more-text">
                                            <p className="block mb-0">{product.sections[1].moreText}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Section 3 */}
                {product.sections?.length >= 3 && (
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
                                            <p className="block mb-0">{product.sections[2].moreText}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="third-description-text">
                                    <p>{product.sections[2].content}</p>
                                    <p>&nbsp;</p>
                                </div>
                            </div>
                        </div>
                        <div className="third-right">
                            {product.sections[2].image && <img src={resolveUrl(product.sections[2].image)} alt="Section 3" className="product-detail-image" />}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductDetail;
