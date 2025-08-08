import React, { useState } from 'react';
import './AdminProducts.css';
import './AdminAbout.css';

export default function AdminProducts() {
    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        subtext: ''
    });

    const handleAddProduct = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewProduct({ name: '', subtext: '' });
    };

    const handleSaveProduct = () => {
        // Here you would typically save to API
        console.log('Saving new product:', newProduct);
        handleCloseModal();
    };

    return (
        <div className="admin-products-container admin-about-container container-fluid">
            <div className="admin-products-header d-flex justify-content-between align-items-center mb-3 pt-3" style={{ padding: '0 15px' }}>
                <h2 className="m-0">Məhsullar</h2>
                <div className="d-flex gap-3 align-items-center" style={{ minWidth: 'fit-content' }}>
                    <span role="button" aria-label="Notifications" title="Bildirişlər" style={{ cursor: 'pointer', display: 'inline-flex' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Zm6-6V11a6 6 0 0 0-5-5.91V4a1 1 0 1 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2Z" />
                        </svg>
                    </span>
                    <div className="dropdown">
                        <button className="btn dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ background: 'transparent', border: 'none', color: 'white' }}>
                            <img src="/assets/globe.png" alt="Language" width="20" height="20" />
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Aze</a></li>
                            <li><a className="dropdown-item" href="#">Eng</a></li>
                            <li><a className="dropdown-item" href="#">Rus</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Search and Add section */}
            <div className="d-flex justify-content-between align-items-center mb-3 ">
                <div></div>
                <div className="d-flex gap-3 align-items-center p-2">
                    <div className="position-relative">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Axtar..."
                            style={{ backgroundColor: '#2a2a2a', border: 'none', color: 'white', paddingLeft: '40px' }}
                        />
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                            aria-hidden="true"
                        >
                            <path d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14Z" stroke="#ffffff" strokeWidth="2" />
                            <path d="M20 20l-4.35-4.35" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <button className="btn d-flex align-items-center gap-2" onClick={handleAddProduct} style={{
                        background: 'linear-gradient(90deg, #007bff, #00d4ff)',
                        border: 'none',
                        color: 'white',
                        borderRadius: '8px',
                        padding: '8px 16px'
                    }}>
                        <span style={{ fontSize: '16px' }}>+</span>
                        Əlavə et
                    </button>
                </div>
            </div>

            {/* Static card reusing About section layout */}
            <div className="admin-about-card p-3 mb-4">
                {/* Top block: ID + Heading + Subtext with image on right */}
                <div className="row g-3 align-items-start mb-4">
                    <div className="col-12 col-lg-8 d-flex flex-column gap-3">
                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">ID</label>
                            <div className="col-sm-9">
                                <div className="form-control-plaintext">01</div>
                            </div>
                        </div>

                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Heading</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Market"
                                    defaultValue="Market"
                                />
                            </div>
                        </div>

                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Subtext</label>
                            <div className="col-sm-9">
                                <textarea
                                    className="form-control"
                                    placeholder="Mətn..."
                                    rows={6}
                                    defaultValue="Market modulunuz mallarınızı anbarınıza daxil olduğu andan etibarən satılan qədər bütün hərəkətlərini təqib edir..."
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="image-upload-container d-flex flex-column gap-2">
                            <div className="image-placeholder position-relative">
                                <div className="image-actions position-absolute">
                                    <button className="action-btn delete-img" aria-label="Delete image">
                                        <img src="/assets/admin-trash.png" alt="Delete" />
                                    </button>
                                    <button className="action-btn refresh-img" aria-label="Refresh image">
                                        <img src="/assets/admin-refresh.png" alt="Refresh" />
                                    </button>
                                </div>
                            </div>
                            <div className="image-info">
                                *Yüklənən şəkil aaa x bbb ölçüsündə olmalıdır
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 1: Subtitle + Subtext with image on right */}
                <div className="row g-3 align-items-start mb-4 ">
                    <div className="col-12 col-lg-8 d-flex flex-column gap-3">
                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Subtitle</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Satış və Kassa idarəetməsi"
                                    defaultValue="Satış və Kassa idarəetməsi"
                                />
                            </div>
                        </div>
                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Subtext</label>
                            <div className="col-sm-9">
                                <textarea
                                    className="form-control"
                                    rows={5}
                                    placeholder="Mətn..."
                                    defaultValue="Satış nöqtəsinin idarə olunması, satış tempinə nəzarət və müxtəlif mal qruplarına görə çeşidləmə imkanı mövcuddur..."
                                />
                            </div>
                        </div>
                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Subtext</label>
                            <div className="col-sm-9">
                                <textarea
                                    className="form-control"
                                    rows={5}
                                    placeholder="Mətn..."
                                    defaultValue="Kassalara limitsiz kassir təyin etmək, günlük hesabatlar hazırlamaq, nağd və bank hesabları arası köçürmələri izləmək mümkündür..."
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="image-upload-container d-flex flex-column gap-2">
                            <div className="image-placeholder position-relative">
                                <div className="image-actions position-absolute">
                                    <button className="action-btn delete-img" aria-label="Delete image">
                                        <img src="/assets/admin-trash.png" alt="Delete" />
                                    </button>
                                    <button className="action-btn refresh-img" aria-label="Refresh image">
                                        <img src="/assets/admin-refresh.png" alt="Refresh" />
                                    </button>
                                </div>
                            </div>
                            <div className="image-info">*Yüklənən şəkil aaa x bbb ölçüsündə olmalıdır</div>
                        </div>
                    </div>
                </div>

                {/* Section 2: Subtitle + Subtext with image on right */}
                <div className="row g-3 align-items-start mb-4">
                    <div className="col-12 col-lg-8 d-flex flex-column gap-3">
                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Subtitle</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Müştəri və CRM idarəetməsi"
                                    defaultValue="Müştəri və CRM idarəetməsi"
                                />
                            </div>
                        </div>
                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Subtext</label>
                            <div className="col-sm-9">
                                <textarea
                                    className="form-control"
                                    rows={5}
                                    placeholder="Mətn..."
                                    defaultValue="Müştəri məlumatları (təhsil, peşə və s.) sistemə daxil edilə bilər..."
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="image-upload-container d-flex flex-column gap-2">
                            <div className="image-placeholder position-relative">
                                <div className="image-actions position-absolute">
                                    <button className="action-btn delete-img" aria-label="Delete image">
                                        <img src="/assets/admin-trash.png" alt="Delete" />
                                    </button>
                                    <button className="action-btn refresh-img" aria-label="Refresh image">
                                        <img src="/assets/admin-refresh.png" alt="Refresh" />
                                    </button>
                                </div>
                            </div>
                            <div className="image-info">*Yüklənən şəkil aaa x bbb ölçüsündə olmalıdır</div>
                        </div>
                    </div>
                </div>

                {/* Section 3: Subtitle + Subtext with image on right */}
                <div className="row g-3 align-items-start">
                    <div className="col-12 col-lg-8 d-flex flex-column gap-3">
                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Subtitle</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Müştəri və CRM idarəetməsi"
                                    defaultValue="Müştəri və CRM idarəetməsi"
                                />
                            </div>
                        </div>
                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Subtext</label>
                            <div className="col-sm-9">
                                <textarea
                                    className="form-control"
                                    rows={5}
                                    placeholder="Mətn..."
                                    defaultValue="Müştəri məlumatları (təhsil, peşə və s.) sistemə daxil edilə bilər..."
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="image-upload-container d-flex flex-column gap-2">
                            <div className="image-placeholder position-relative">
                                <div className="image-actions position-absolute">
                                    <button className="action-btn delete-img" aria-label="Delete image">
                                        <img src="/assets/admin-trash.png" alt="Delete" />
                                    </button>
                                    <button className="action-btn refresh-img" aria-label="Refresh image">
                                        <img src="/assets/admin-refresh.png" alt="Refresh" />
                                    </button>
                                </div>
                            </div>
                            <div className="image-info">*Yüklənən şəkil aaa x bbb ölçüsündə olmalıdır</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Product Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">Yeni Məhsul Əlavə Et</h3>
                            <button className="modal-close" onClick={handleCloseModal}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="form-group mb-3">
                                <label className="form-label">Məhsul Adı</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Məhsul adını daxil edin"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Məhsul Təsviri</label>
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    placeholder="Məhsul təsvirini daxil edin"
                                    value={newProduct.subtext}
                                    onChange={(e) => setNewProduct({ ...newProduct, subtext: e.target.value })}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Şəkil</label>
                                <div className="image-upload-container">
                                    <div className="image-placeholder position-relative">
                                        <div className="image-actions position-absolute">
                                            <button className="action-btn delete-img" aria-label="Delete image">
                                                <img src="/assets/admin-trash.png" alt="Delete" />
                                            </button>
                                            <button className="action-btn refresh-img" aria-label="Refresh image">
                                                <img src="/assets/admin-refresh.png" alt="Refresh" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="image-info">
                                        *Yüklənən şəkil aaa x bbb ölçüsündə olmalıdır
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={handleCloseModal}>
                                Ləğv et
                            </button>
                            <button className="btn btn-primary" onClick={handleSaveProduct}>
                                Əlavə et
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}