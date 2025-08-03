import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { equipmentList } from './data/equipmentData';
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
    const timeoutRef = useRef(null);

    const slideDuration = 300;

    const currentItem = equipmentList[currentIndex];
    const hasMultipleImages = currentItem.images && currentItem.images.length > 1;
    const currentImage = hasMultipleImages ? currentItem.images[currentImageIndex] : currentItem.img;

    const handleMoreClick = () => {
        navigate(`/equipment/${currentItem.id}`);
    };

    const startSlide = (direction) => {
        if (isSliding) return;
        setSlideDirection(direction);
        setIsSliding(true);

        timeoutRef.current = setTimeout(() => {
            setCurrentIndex((prev) => {
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

        const touch = e.touches[0];
        const deltaY = touchStartY - touch.clientY;
        const threshold = 80;

        if (Math.abs(deltaY) > threshold) {
            const now = Date.now();
            const timeDiff = now - lastScrollTime;

            if (timeDiff < 400) return;

            const direction = deltaY > 0 ? -1 : 1;
            setCurrentImageIndex(prevIndex => {
                const newIndex = prevIndex + direction;
                return Math.max(0, Math.min(newIndex, currentItem.images.length - 1));
            });
            setTouchStartY(null);
            setLastScrollTime(now);
        }
    };

    const handleScrollerTouchEnd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setTouchStartY(null);
    };

    useEffect(() => {
        setCurrentImageIndex(0);
    }, [currentIndex]);

    // Custom non-passive wheel listener to prevent page scroll
    useEffect(() => {
        const square = document.querySelector('.equipment-square');
        if (!square || !hasMultipleImages) return;

        const handleWheel = (e) => {
            e.preventDefault();
            e.stopPropagation();

            const now = Date.now();
            const timeDiff = now - lastScrollTime;
            if (timeDiff < 300) return;

            const delta = e.deltaY;
            const direction = delta > 0 ? 1 : -1;

            setCurrentImageIndex(prevIndex => {
                const newIndex = prevIndex + direction;
                return Math.max(0, Math.min(newIndex, currentItem.images.length - 1));
            });

            setLastScrollTime(now);
        };

        square.addEventListener('wheel', handleWheel, { passive: false });
        return () => square.removeEventListener('wheel', handleWheel);
    }, [currentItem, lastScrollTime]);

    return (
        <div className="equipment-container">
            <div className="equipment-circle-background-left-1"></div>
            <div className="equipment-circle-background-left-2"></div>
            <div className="equipment-circle-background-left-3"></div>
            <div className="equipment-circle-background-left-4"></div>

            <div className="equipment-center">
                <div className="equipment-logo">
                    <img src="/assets/logo-white.png" alt="Logo" />
                </div>
                <div className="equipment-text">
                    <p>Avadanlıqlar</p>
                </div>
                <div className="equipment-rainbow">
                    <img src="/assets/rainbow.png" alt="Rainbow" />
                </div>
            </div>

            <div className="equipment-content-row">
                <div className="equipment-left">
                    <div className="equipment-square" style={slideDirection ? getSlideStyle() : resetSlideStyle()} onTouchStart={handleScrollerTouchStart} onTouchMove={handleScrollerTouchMove} onTouchEnd={handleScrollerTouchEnd}>
                        <div className="equipment-square-content">
                            <div className="equipment-product-title">
                                {currentItem.name.split(' ').slice(0, -1).join(' ')}<br />
                                {currentItem.name.split(' ').slice(-1)}
                            </div>
                            <div className="equipment-product-model blue">{currentItem.version}</div>
                            <div className="equipment-product-cpu">{currentItem.core}</div>
                            <button className="equipment-more-btn" onClick={handleMoreClick}>Daha çox</button>
                        </div>

                        {hasMultipleImages && (
                            <div className="equipment-image-scroller">
                                <div className="equipment-scroller-track">
                                    <div className="equipment-scroller-thumb" style={{ height: `${100 / currentItem.images.length}%`, top: `${(currentImageIndex / (currentItem.images.length - 1)) * (100 - (100 / currentItem.images.length))}%` }}></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="equipment-right">
                    <div className="equipment-img-wrapper" style={slideDirection ? getSlideStyle() : resetSlideStyle()}>
                        <div className="equipment-title-left">
                            <div className="equipment-product-id">{currentItem.id}</div>
                            {currentItem.name}
                        </div>
                        <button className="equipment-nav-btn prev-btn" onClick={() => startSlide('right')}>&#60;</button>
                        <img src={currentImage} alt={currentItem.name} className="equipment-main-img" onClick={() => setShowModal(true)} />
                        <button className="equipment-nav-btn next-btn" onClick={() => startSlide('left')}>&#62;</button>
                    </div>

                    <div className="equipment-details" style={slideDirection ? getSlideStyle() : resetSlideStyle()}>
                        <div className="equipment-cpu">{currentItem.core}</div>
                        <div className="equipment-model">{currentItem.version}</div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="equipment-modal" onClick={() => setShowModal(false)}>
                    <img src={currentImage} alt={currentItem.name} className="equipment-modal-img" />
                </div>
            )}
        </div>
    );
}

export default Equipment;
