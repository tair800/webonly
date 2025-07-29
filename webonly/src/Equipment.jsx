import React from 'react';
import './Equipment.css';

const equipmentList = [
    {
        id: 1,
        name: "PosClass TX-1500S",
        version: "J-1900",
        core: "İntel Core I5",
        img: "/src/assets/equipment1.png"
    },
    // Add more equipment here
];

function Equipment() {
    return (
        <div className="equipment-container">
            <div className="equipment-center">
                <div className="equipment-logo">
                    <img src="/src/assets/logo-white.png" alt="Logo" />
                </div>
                <div className="equipment-text">
                    <p>Avadanlıqlar</p>
                </div>
                <div className="equipment-rainbow">
                    <img src="/src/assets/rainbow.png" alt="Rainbow" />
                </div>
            </div>
            <div className="equipment-content-row">
                <div className="equipment-left">
                    <div className="equipment-square">
                        <div className="equipment-square-content">
                            <div className="equipment-product-title">PosClass<br />TX-1500S</div>
                            <div className="equipment-product-model blue">{equipmentList[0].version}</div>
                            <div className="equipment-product-cpu">İntel Core I5</div>
                            <button className="equipment-more-btn">Daha çox</button>
                        </div>
                    </div>
                </div>
                <div className="equipment-right">
                    <div className="equipment-img-wrapper">
                        <div className="equipment-title-left">{equipmentList[0].name}</div>
                        <button className="equipment-nav-btn prev-btn">&#60;</button>
                        <img src={equipmentList[0].img} alt={equipmentList[0].name} className="equipment-main-img" />
                        <button className="equipment-nav-btn next-btn">&#62;</button>
                    </div>
                    <div className="equipment-details">
                        <div className="equipment-cpu">{equipmentList[0].core}</div>
                        <div className="equipment-model">{equipmentList[0].version}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Equipment; 