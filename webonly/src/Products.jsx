import React, { useState } from 'react';
import { products } from './data/productData';
import ProductCard3D from './components/ProductCard3D';
import './Products.css';

function Products() {
    const [productsState] = useState(products);

    return (
        <div className="products-container">
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

            <div className="products-grid-3d">
                {productsState.map((product) => (
                    <div key={product.id} className="product-card-3d-wrapper">
                        <ProductCard3D product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;    