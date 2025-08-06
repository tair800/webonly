import React, { useState } from 'react';
import { products } from './data/productData';
import ProductCard3D from './components/ProductCard3D';
import Spline from '@splinetool/react-spline';
import './Products.css';

function Products() {
    const [productsState] = useState(products);
    const [splineError, setSplineError] = useState(false);

    return (
        <div className="products-container">
            <div className="products-circle-background-left-1"></div>
            <div className="products-circle-background-left-2"></div>

            <div className="products-center">
                <div className="products-rainbow">
                    {!splineError ? (
                        <Spline
                            scene="https://prod.spline.design/mP2TljaQ-tsNIzZt/scene.splinecode"
                            onError={(error) => {
                                console.log('Spline error:', error);
                                setSplineError(true);
                            }}
                        />
                    ) : (
                        <div className="spline-fallback">
                            <img src="/assets/rainbow.png" alt="Rainbow" />
                        </div>
                    )}
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