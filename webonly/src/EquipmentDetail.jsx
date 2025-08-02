import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { equipmentList } from './data/equipmentData';
import './EquipmentDetail.css';

function EquipmentDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);

    const equipment = equipmentList.find(item => item.id === parseInt(id));

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
                    <div className="equipment-model">{equipment.specifications.model}</div>
                    <button className="equipment-detail-nav-button" onClick={() => setCurrentPage(currentPage === 0 ? 1 : 0)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: currentPage === 1 ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                            <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="equipment-specifications-list">
                    {Object.entries({
                        screenSize: "Ekran ölçüsü",
                        multiTouch: "Multi-Touch Sensor Ekran",
                        processor: "Prosessor",
                        memory: "Yaddaş RAM",
                        storage: "Flash Disk",
                        operatingSystem: "Uyğun əməliyyat sistemi",
                        graphics: "Qrafik Kartı",
                        network: "Şəbəkə",
                        ports: "Portlar",
                        power: "Enerji Təchizatı",
                        dimensions: "Ölçülər",
                        weight: "Çəki"
                    }).filter(([key, label]) => {
                        const value = equipment.specifications[key];
                        return value;
                    }).slice(currentPage * 6, (currentPage * 6) + 6).map(([key, label]) => {
                        const value = equipment.specifications[key];
                        const parts = value.split(' - ');
                        const topValue = parts[0];
                        const bottomValue = parts[1] || '';

                        return (
                            <div key={key} className="specification-item">
                                <div className="spec-label">{label}</div>
                                <div className="spec-line-css"></div>
                                <div className="spec-value">
                                    <div className="spec-value-top">{topValue}</div>
                                    {bottomValue && <div className="spec-value-bottom">{bottomValue}</div>}
                                </div>
                            </div>
                        );
                    })}
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