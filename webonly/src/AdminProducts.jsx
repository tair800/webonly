import React, { useState } from 'react';
import './AdminProducts.css';

export default function AdminProducts() {
    const [products, setProducts] = useState([]);

    const addProduct = () => {
        const newProduct = {
            id: Date.now(),
            name: "",
            subtext: "",
            image: ""
        };
        setProducts([...products, newProduct]);
    };

    const removeProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const updateProduct = (id, field, value) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, [field]: value } : product
        ));
    };

    return (
        <div className="admin-products-container container-fluid">
            {/* Products Header */}
            <div className="admin-products-header">
                <h2>Products</h2>
                <button className="add-product-btn" onClick={addProduct}>
                    + Add Product
                </button>
            </div>

            {/* Products Grid */}
            <div className="products-grid">
                {/* Add Product Tile */}
                <div className="add-product-tile" onClick={addProduct}>
                    <div className="add-icon">+</div>
                    <div className="add-text">Add New Product</div>
                </div>

                {/* Existing Products */}
                {products.map((product) => (
                    <div key={product.id} className="product-item">
                        <div className="product-image">
                            {/* Image placeholder - will be replaced with actual image */}
                        </div>
                        <div className="product-content">
                            <input
                                type="text"
                                placeholder="Product Name"
                                value={product.name}
                                onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                                className="product-name-input"
                            />
                            <textarea
                                placeholder="Product Description"
                                value={product.subtext}
                                onChange={(e) => updateProduct(product.id, 'subtext', e.target.value)}
                                className="product-description-input"
                            />
                        </div>
                        <div className="product-actions">
                            <button
                                className="delete-btn"
                                onClick={() => removeProduct(product.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 