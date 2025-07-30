import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EquipmentDetail.css';

const equipmentList = [
    {
        id: 1,
        name: "PosClass TX-1500S",
        description: "Satış və xidmət proseslərini sürətləndirən, stabil və etibarlı POS terminal. İnteqrasiya olunmuş kart və RFID oxuyucu ilə təhlükəsiz ödəniş imkanı yaradır.",
        features: [
            "Türkiyə İstehsalı Keyfiyyət",
            "1 İl Rəsmi Zəmanət",
            "Wi-Fi Adapter Artırma İmkanı",
            "10.1\" Arxa Ekran Əlavə İmkanı"
        ],
        img: "/src/assets/equipment1.png"
    },
    {
        id: 2,
        name: "saPosClass TX-1500S",
        description: "Satış və xidmət proseslərini sürətləndirən, stabil və etibarlı POS terminal. İnteqrasiya olunmuş kart və RFID oxuyucu ilə təhlükəsiz ödəniş imkanı yaradır.",
        features: [
            "Türkiyə İstehsalı Keyfiyyət",
            "1 İl Rəsmi Zəmanət",
            "Wi-Fi Adapter Artırma İmkanı",
            "10.1\" Arxa Ekran Əlavə İmkanı"
        ],
        img: "/src/assets/equipment1.png"
    },
    {
        id: 3,
        name: "PosClass TX-1500S",
        description: "Satış və xidmət proseslərini sürətləndirən, stabil və etibarlı POS terminal. İnteqrasiya olunmuş kart və RFID oxuyucu ilə təhlükəsiz ödəniş imkanı yaradır.",
        features: [
            "Türkiyə İstehsalı Keyfiyyət",
            "1 İl Rəsmi Zəmanət",
            "Wi-Fi Adapter Artırma İmkanı",
            "10.1\" Arxa Ekran Əlavə İmkanı"
        ],
        img: "/src/assets/equipment1.png"
    }
];

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
                <div className="equipment-detail-team-title">Əlavə Məlumat</div>
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