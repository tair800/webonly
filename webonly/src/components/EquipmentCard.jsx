import React from 'react';
import './EquipmentCard.css';

const EquipmentCard = ({ equipment, onMoreClick }) => {
    const resolveUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('/uploads/') || url.startsWith('/assets/')) {
            return `http://localhost:5098${url}`;
        }
        return url;
    };

    const imageUrl = resolveUrl(equipment.imageUrl);

    return (
        <div className="equipment-card">
            {/* Image Section - Upper two-thirds */}
            <div className="equipment-card-image-container">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={equipment.name}
                        className="equipment-card-image"
                        onError={(e) => {
                            e.target.src = '/assets/equipment1.png'; // Fallback image
                        }}
                    />
                ) : (
                    <div className="equipment-card-placeholder">
                        <img src="/assets/equipment1.png" alt="Equipment" />
                    </div>
                )}
            </div>

            {/* Black Background Section - Lower one-third */}
            <div className="equipment-card-black-section">
                <div className="equipment-card-info">
                    <div className="equipment-card-category">Equipment</div>
                    <div className="equipment-card-name">{equipment.name}</div>
                    <div className="equipment-card-model">{equipment.version || 'N/A'}</div>
                </div>

                <button
                    className="equipment-card-more-btn"
                    onClick={() => onMoreClick(equipment.id)}
                >
                    Daha çox
                </button>
            </div>
        </div>
    );
};

export default EquipmentCard;
