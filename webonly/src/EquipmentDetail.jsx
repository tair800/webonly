import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { equipmentList } from './data/equipmentData';
import './EquipmentDetail.css';

function EquipmentDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

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
            {/* Circle Background Elements */}
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
                </div>

                <div className="equipment-specifications-list">
                    <div className="specification-item">
                        <div className="spec-label">Ekran ölçüsü</div>
                        <div className="spec-line-css"></div>
                        <div className="spec-value">
                            <div className="spec-value-top">15 inch LED LCD proyeksiyalı</div>
                            <div className="spec-value-bottom">Kapasitiv panel</div>
                        </div>
                    </div>

                    <div className="specification-item">
                        <div className="spec-label">Multi-Touch Sensor Ekran</div>
                        <div className="spec-line-css"></div>
                        <div className="spec-value">
                            <div className="spec-value-top">10 barmaq</div>
                            <div className="spec-value-bottom"></div>
                        </div>
                    </div>

                    <div className="specification-item">
                        <div className="spec-label">Prosessor</div>
                        <div className="spec-line-css"></div>
                        <div className="spec-value">
                            <div className="spec-value-top">Intel BayTrail J1900</div>
                            <div className="spec-value-bottom">2.0 GHZ</div>
                        </div>
                    </div>

                    <div className="specification-item">
                        <div className="spec-label">Yaddaş RAM</div>
                        <div className="spec-line-css"></div>
                        <div className="spec-value">
                            <div className="spec-value-top">4GB DDR3 SODIMM - 8GB</div>
                            <div className="spec-value-bottom">(1333/1666 MHz)</div>
                        </div>
                    </div>

                    <div className="specification-item">
                        <div className="spec-label">Flash Disk</div>
                        <div className="spec-line-css"></div>
                        <div className="spec-value">
                            <div className="spec-value-top">120GB SSD HDD 2.5" /MSATA</div>
                            <div className="spec-value-bottom">240GB SSD artırma imkanı</div>
                        </div>
                    </div>

                    <div className="specification-item">
                        <div className="spec-label">Uyğun əməliyyat sistemi</div>
                        <div className="spec-line-css"></div>
                        <div className="spec-value">
                            <div className="spec-value-top">Microsoft Windows 7, Windows 8.1</div>
                            <div className="spec-value-bottom">Windows 10, Windows 11, Posready 7</div>
                        </div>
                    </div>
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