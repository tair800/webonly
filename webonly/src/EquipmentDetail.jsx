import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EquipmentDetail.css';

function EquipmentDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [equipment, setEquipment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const resolveUrl = (url) => {
        if (!url) return '';

        // If it's already a full URL, return as is
        if (url.startsWith('http')) return url;

        // Handle relative paths
        if (url.startsWith('/uploads/') || url.startsWith('/assets/')) {
            return `http://localhost:5098${url}`;
        }

        return url;
    };

    // Fetch equipment detail
    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:5098/api/equipment/${id}`);
                if (!res.ok) throw new Error('Failed to load equipment');
                const data = await res.json();

                console.log('Equipment API Response:', data);
                console.log('Raw features from API:', data.features);
                console.log('Raw specifications from API:', data.specifications);

                // Transform API data to match the expected structure
                const equipmentData = {
                    id: data.id,
                    name: data.name,
                    version: data.version,
                    core: data.core,
                    description: data.description || '',
                    img: data.imageUrl ? resolveUrl(data.imageUrl) : '',
                    features: data.features?.map(f => f.feature) || [],
                    specifications: data.specifications?.reduce((acc, spec) => {
                        acc[spec.key] = spec.value || '';
                        return acc;
                    }, {}) || {}
                };

                console.log('Processed Equipment Data:', equipmentData);
                console.log('Features array:', equipmentData.features);
                console.log('Features length:', equipmentData.features.length);
                console.log('Specifications object:', equipmentData.specifications);
                console.log('Specifications keys:', Object.keys(equipmentData.specifications));
                console.log('Specifications keys length:', Object.keys(equipmentData.specifications).length);

                setEquipment(equipmentData);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="equipment-detail-container">
                <div className="equipment-detail-center">
                    <h2>Loading...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="equipment-detail-container">
                <div className="equipment-detail-center">
                    <h2>Error: {error}</h2>
                    <button onClick={() => navigate('/equipment')} className="back-btn">
                        Back to Equipment
                    </button>
                </div>
            </div>
        );
    }

    if (!equipment) {
        return (
            <div className="equipment-detail-container">
                <div className="equipment-detail-center">
                    <h2>Equipment not found</h2>
                    <button onClick={() => navigate('/equipment')} className="back-btn">
                        Back to Equipment
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="equipment-detail-container">
            <div className="equipment-detail-circle-background-1"></div>
            <div className="equipment-detail-circle-background-2"></div>
            <div className="equipment-detail-circle-background-3"></div>
            <div className="equipment-detail-circle-background-4"></div>

            <div className="equipment-detail-content">
                <div className="equipment-detail-left">
                    <h1 className="equipment-detail-title">{equipment.name}</h1>
                    <p className="equipment-detail-description">{equipment.description}</p>
                    <div className="equipment-detail-features">
                        {equipment.features.map((feature, index) => (
                            <div key={index} className="equipment-feature-item">
                                <div className="feature-checkmark">✓</div>
                                <span className="feature-text">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="equipment-detail-right">
                    <div className="equipment-image-container">
                        <img src={equipment.img} alt={equipment.name} className="equipment-detail-image" />
                    </div>
                </div>
            </div>

            <div className="equipment-detail-team-header">
                <div className="equipment-detail-team-title">Xüsusiyyətlər</div>
                <div className="equipment-detail-team-nav">
                    <div className="equipment-detail-team-nav-dot equipment-detail-team-nav-dot-faded"></div>
                    <div className="equipment-detail-team-nav-dot equipment-detail-team-nav-dot-gradient"></div>
                    <div className="equipment-detail-team-divider"></div>
                    <div className="equipment-detail-team-bar"></div>
                </div>
            </div>

            <div className="equipment-specifications-section">
                <div className="equipment-specifications-header">
                    <div className="equipment-model">{equipment.version || equipment.core || 'Model'}</div>
                    {equipment.specifications && Object.keys(equipment.specifications).length > 6 && (
                        <button className="equipment-detail-nav-button" onClick={() => setCurrentPage(currentPage === 0 ? 1 : 0)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: currentPage === 1 ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    )}
                </div>

                <div className="equipment-specifications-list">
                    {equipment.specifications && Object.keys(equipment.specifications).length > 0 ? (
                        Object.entries(equipment.specifications)
                            .filter(([key, value]) => value && value.trim() !== '' && key !== 'model')
                            .slice(currentPage * 6, (currentPage * 6) + 6)
                            .map(([key, value]) => {
                                const parts = value.split(' - ');
                                const topValue = parts[0];
                                const bottomValue = parts[1] || '';

                                return (
                                    <div key={key} className="specification-item">
                                        <div className="spec-label">{key}</div>
                                        <div className="spec-line-css"></div>
                                        <div className="spec-value">
                                            <div className="spec-value-top">{topValue}</div>
                                            {bottomValue && <div className="spec-value-bottom">{bottomValue}</div>}
                                        </div>
                                    </div>
                                );
                            })
                    ) : (
                        <div className="text-center text-muted py-4">
                            No specifications available
                        </div>
                    )}
                </div>
            </div>

            <div className="equipment-detail-team-header">
                <div className="equipment-detail-team-title">Oxşar avadanlıqlar</div>
                <div className="equipment-detail-team-nav">
                    <div className="equipment-detail-team-nav-dot equipment-detail-team-nav-dot-faded"></div>
                    <div className="equipment-detail-team-nav-dot equipment-detail-team-nav-dot-gradient"></div>
                    <div className="equipment-detail-team-divider"></div>
                    <div className="equipment-detail-team-bar"></div>
                </div>
            </div>
        </div>
    );
}

export default EquipmentDetail; 