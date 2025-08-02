import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from './data/productData';
import './Products.css';

function Products() {
    const navigate = useNavigate();

    const [productsState] = useState(products);

    const handleProductClick = (product) => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div className="products-container">
            {/* Circle Background Elements */}
            <div className="products-circle-background-left-1"></div>
            <div className="products-circle-background-left-2"></div>

            <div className="products-center">
                <div className="products-logo">
                    <img src="/assets/logo-white.png" alt="Logo" />
                </div>
                <div className="products-text">
                    <p>Məhsullar</p>
                </div>
                <div className="products-rainbow">
                    <img src="/assets/rainbow.png" alt="Rainbow" />
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
                {productsState.map((product) => (
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