import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';

function Products() {
    const navigate = useNavigate();

    const [products] = useState([
        {
            id: 1,
            name: "Market",
            icon: "/src/assets/market-icon.png",
            alt: "Market",
            path: "/market"
        },
        {
            id: 2,
            name: "Tekstil Modulu",
            icon: "/src/assets/textile.png",
            alt: "Tekstil",
            path: "/textile"
        },
        {
            id: 3,
            name: "Restoran İdarəetmə modulu",
            icon: "/src/assets/restaurant.png",
            alt: "Restoran",
            path: "/restaurant"
        },
        {
            id: 4,
            name: "Mobil satış",
            icon: "/src/assets/mobile.png",
            alt: "Mobil",
            path: "/mobile"
        },
        {
            id: 5,
            name: "Aptek İdarəetmə sistemi",
            icon: "/src/assets/medicine.png",
            alt: "Aptek",
            path: "/medicine"
        },
        {
            id: 6,
            name: "Ticarət və Anbar",
            icon: "/src/assets/factory.png",
            alt: "Fabrika",
            path: "/factory"
        },
        {
            id: 7,
            name: "Kredit və Lombard",
            icon: "/src/assets/credit.png",
            alt: "Kredit",
            path: "/credit"
        }
    ]);

    const handleProductClick = (product) => {
        navigate(product.path);
    };

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
                    <div
                        key={product.id}
                        className="product-card"
                        onClick={() => handleProductClick(product)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div
                            className="product-icon"
                            style={{
                                width: '100px',
                                height: '100px',
                                WebkitMask: `url(${product.icon}) no-repeat center / contain`,
                                mask: `url(${product.icon}) no-repeat center / contain`,
                                background: 'linear-gradient(180deg, rgba(70, 126, 254, 0.9) 0%, rgba(255,255,255,0.9) 100%)',
                                margin: '0 auto'
                            }}
                            aria-label={product.alt}
                        ></div>
                        <div className="product-name">
                            {product.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products; 