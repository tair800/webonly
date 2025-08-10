import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import './Equipment.css';

function Equipment() {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState(null);
    const [isSliding, setIsSliding] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [touchStartY, setTouchStartY] = useState(null);
    const [lastScrollTime, setLastScrollTime] = useState(0);
    const [splineError, setSplineError] = useState(false);
    const [equipmentList, setEquipmentList] = useState([]);
    const timeoutRef = useRef(null);

    const slideDuration = 300;

    const resolveUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('/uploads/') || url.startsWith('/assets/')) {
            return `http://localhost:5098${url}`;
        }
        return url;
    };

    const currentItem = equipmentList[currentIndex] || {};
    const hasMultipleImages = false;
    const currentImage = resolveUrl(currentItem.imageUrl);

    const handleMoreClick = () => {
        if (currentItem?.id) navigate(`/equipment/${currentItem.id}`);
    };

    const startSlide = (direction) => {
        if (isSliding) return;
        setSlideDirection(direction);
        setIsSliding(true);

        timeoutRef.current = setTimeout(() => {
            setCurrentIndex((prev) => {
                if (!equipmentList.length) return 0;
                if (direction === 'left') {
                    return prev === equipmentList.length - 1 ? 0 : prev + 1;
                } else {
                    return prev === 0 ? equipmentList.length - 1 : prev - 1;
                }
            });
            setSlideDirection(null);
            setIsSliding(false);
        }, slideDuration);
    };

    const getSlideStyle = () => {
        if (!slideDirection) return {};
        const distance = slideDirection === 'left' ? '-100%' : '100%';
        return {
            transform: `translateX(${distance})`,
            transition: `transform ${slideDuration}ms ease-in-out`,
        };
    };

    const resetSlideStyle = () => ({
        transform: 'translateX(0)',
        transition: `transform ${slideDuration}ms ease-in-out`,
    });

    const handleScrollerTouchStart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!hasMultipleImages) return;
        const touch = e.touches[0];
        setTouchStartY(touch.clientY);
    };

    const handleScrollerTouchMove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!hasMultipleImages || !touchStartY) return;
    };

    const handleScrollerTouchEnd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setTouchStartY(null);
    };

    useEffect(() => {
        setCurrentImageIndex(0);
    }, [currentIndex]);

    // Fetch equipment from API
    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const res = await fetch('http://localhost:5098/api/equipment');
                if (!res.ok) throw new Error('Failed to load equipment');
                const data = await res.json();
                setEquipmentList(data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchEquipment();
    }, []);

    return (
        <div className="equipment-container">
            <div className="equipment-circle-background-left-1"></div>
            <div className="equipment-circle-background-left-2"></div>
            <div className="equipment-circle-background-left-3"></div>
            <div className="equipment-circle-background-left-4"></div>

            <div className="equipment-center">
                <div className="equipment-rainbow">
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
            </div>

            <div className="equipment-content-row">
                <div className="equipment-left">
                    <div className="equipment-square" style={slideDirection ? getSlideStyle() : resetSlideStyle()} onTouchStart={handleScrollerTouchStart} onTouchMove={handleScrollerTouchMove} onTouchEnd={handleScrollerTouchEnd}>
                        <div className="equipment-square-content">
                            <div className="equipment-product-title">
                                {(currentItem.name || '').split(' ').slice(0, -1).join(' ')}<br />
                                {(currentItem.name || '').split(' ').slice(-1)}
                            </div>
                            <div className="equipment-product-model blue">{currentItem.version}</div>
                            <div className="equipment-product-cpu">{currentItem.core}</div>
                            <button className="equipment-more-btn" onClick={handleMoreClick}>Daha çox</button>
                        </div>
                    </div>
                </div>

                <div className="equipment-right">
                    <div className="equipment-img-wrapper" style={slideDirection ? getSlideStyle() : resetSlideStyle()}>
                        <div className="equipment-title-left">
                            <div className="equipment-product-id">{currentItem.id}</div>
                            {currentItem.name}
                        </div>
                        <button className="equipment-nav-btn prev-btn" onClick={() => startSlide('right')}>&#60;</button>
                        {currentImage && <img src={currentImage} alt={currentItem.name} className="equipment-main-img" onClick={() => setShowModal(true)} />}
                        <button className="equipment-nav-btn next-btn" onClick={() => startSlide('left')}>&#62;</button>
                    </div>

                    <div className="equipment-details" style={slideDirection ? getSlideStyle() : resetSlideStyle()}>
                        <div className="equipment-cpu">{currentItem.core}</div>
                        <div className="equipment-model">{currentItem.version}</div>
                    </div>
                </div>
            </div>

            {showModal && currentImage && (
                <div className="equipment-modal" onClick={() => setShowModal(false)}>
                    <img src={currentImage} alt={currentItem.name} className="equipment-modal-img" />
                </div>
            )}
        </div>
    );
}

export default Equipment;
