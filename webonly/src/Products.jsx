import React, { useState } from 'react';
import './Products.css';

function Products() {
    const [products] = useState([
        {
            id: 1,
            name: "Market",
            icon: "/src/assets/market-icon.png",
            alt: "Market"
        },
        {
            id: 2,
            name: "Market",
            icon: "/src/assets/market-icon.png",
            alt: "Market"
        },
        {
            id: 3,
            name: "Market",
            icon: "/src/assets/market-icon.png",
            alt: "Market"
        }
        // Add more products here as needed
    ]);

    return (
        <div className="products-container">
            <div className="products-center">
                <div className="products-logo">
                    <img src="/src/assets/logo-white.png" alt="Logo" />
                </div>
                <div className="products-text">
                    <p>Məhsullar</p>
                </div>
                <div className="products-rainbow">
                    <img src="/src/assets/rainbow.png" alt="Rainbow" />
                </div>
            </div>

            <div className="products-team-header">
                <div className="products-team-title">Kategoriyalar</div>
                <div className="products-team-nav">
                    <div className="products-team-nav-dot products-team-nav-dot-faded"></div>
                    <div className="products-team-nav-dot products-team-nav-dot-gradient"></div>
                    <div className="products-team-divider"></div>
                    <div className="products-team-bar"></div>
                </div>
            </div>

            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <div className="product-icon">
                            <img src={product.icon} alt={product.alt} />
                        </div>
                        <div className="product-name">{product.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products; 