import React, { useEffect, useState } from 'react';
import './AdminProducts.css';
import './AdminAbout.css';

const API = 'http://localhost:5098/api';

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [originalById, setOriginalById] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', subtext: '', icon: '', alt: '', path: '', mainImage: '', imageUrl: '' });
    const [newImageFile, setNewImageFile] = useState(null);
    const [newImagePreview, setNewImagePreview] = useState('');
    const [newIconFile, setNewIconFile] = useState(null);
    const [newIconPreview, setNewIconPreview] = useState('');
    const [creating, setCreating] = useState(false);
    const isCreateValid = () => {
        const hasName = (newProduct.name || '').trim().length > 0;
        const hasSubtext = (newProduct.subtext || '').trim().length > 0;
        const hasDetail = (newProduct.detailDescription || '').trim().length > 0;
        const hasMainImage = !!newImageFile || ((newProduct.imageUrl || '').trim().length > 0);
        const hasIcon = !!newIconFile || ((newProduct.icon || '').trim().length > 0);
        return hasName && hasSubtext && hasDetail && hasMainImage && hasIcon;
    };
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const resolveUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('/uploads/')) return `http://localhost:5098${url}`;
        return url;
    };

    const loadProducts = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API}/products`);
            if (!res.ok) throw new Error('Failed to load products');
            const data = await res.json();
            const normalized = data.map(p => ({ ...p, images: Array.isArray(p.images) ? p.images : [] }));
            setProducts(normalized);
            const map = {}; data.forEach(p => map[p.id] = { ...p });
            setOriginalById(map);
        } catch (e) { setError(e.message); } finally { setLoading(false); }
    };

    useEffect(() => { loadProducts(); }, []);

    const handleAddProduct = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setNewProduct({ name: '', subtext: '', icon: '', alt: '', path: '', mainImage: '', imageUrl: '', detailDescription: '', section1Title: '', section1Description: '', section1MoreText: '', section2Title: '', section2Description: '', section2MoreText: '', section3Title: '', section3Description: '', section3MoreText: '' });
        setNewImageFile(null);
        setNewImagePreview('');
        setCreating(false);
        setNewIconFile(null);
        setNewIconPreview('');
    };

    const createProduct = async () => {
        try {
            // Frontend required fields validation (everything except section texts)
            if (!isCreateValid()) {
                alert('Zəhmət olmasa tələb olunan sahələri doldurun: Ad, Subtext, Ətraflı təsvir, Şəkil, İkon');
                return;
            }
            setCreating(true);
            const res = await fetch(`${API}/products`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                    name: newProduct.name,
                    subtext: newProduct.subtext,
                    imageUrl: newProduct.imageUrl,
                    detailDescription: newProduct.detailDescription,
                    section1Title: newProduct.section1Title,
                    section1Description: newProduct.section1Description,
                    section1MoreText: newProduct.section1MoreText,
                    section2Title: newProduct.section2Title,
                    section2Description: newProduct.section2Description,
                    section2MoreText: newProduct.section2MoreText,
                    section3Title: newProduct.section3Title,
                    section3Description: newProduct.section3Description,
                    section3MoreText: newProduct.section3MoreText
                })
            });
            if (!res.ok) throw new Error('Create failed');
            const created = await res.json();

            // Upload icon first if selected
            if (newIconFile && created?.id) {
                const formIcon = new FormData();
                formIcon.append('file', newIconFile);
                const upIcon = await fetch(`${API}/upload/product/${created.id}`, { method: 'POST', body: formIcon });
                if (upIcon.ok) {
                    const { url: iconUrl } = await upIcon.json();
                    await fetch(`${API}/products/${created.id}`, {
                        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                            name: created.name || newProduct.name || '',
                            subtext: created.subtext || newProduct.subtext || '',
                            imageUrl: created.imageUrl || newProduct.imageUrl || '',
                            icon: iconUrl
                        })
                    });
                }
            }

            if (newImageFile && created?.id) {
                const form = new FormData();
                form.append('file', newImageFile);
                const up = await fetch(`${API}/upload/product/${created.id}`, { method: 'POST', body: form });
                if (up.ok) {
                    const { url } = await up.json();
                    await fetch(`${API}/products/${created.id}`, {
                        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                            name: created.name || newProduct.name || '',
                            subtext: created.subtext || newProduct.subtext || '',
                            imageUrl: url,
                            detailDescription: newProduct.detailDescription || '',
                            section1Title: newProduct.section1Title || '',
                            section1Description: newProduct.section1Description || '',
                            section1MoreText: newProduct.section1MoreText || '',
                            section2Title: newProduct.section2Title || '',
                            section2Description: newProduct.section2Description || '',
                            section2MoreText: newProduct.section2MoreText || '',
                            section3Title: newProduct.section3Title || '',
                            section3Description: newProduct.section3Description || '',
                            section3MoreText: newProduct.section3MoreText || ''
                        })
                    });
                    await fetch(`${API}/products/${created.id}/images`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageUrl: url, alt: created.alt || '' }) });
                }
            }

            handleCloseModal();
            await loadProducts();
        } catch (e) { alert(e.message); }
        finally { setCreating(false); }
    };

    const hasChanges = (p) => {
        const o = originalById[p.id];
        if (!o) return false;
        return (
            (p.name || '') !== (o.name || '') ||
            (p.subtext || '') !== (o.subtext || '') ||
            (p.icon || '') !== (o.icon || '') ||
            (p.alt || '') !== (o.alt || '') ||
            (p.path || '') !== (o.path || '') ||
            (p.mainImage || '') !== (o.mainImage || '') ||
            (p.imageUrl || '') !== (o.imageUrl || '') ||
            (p.section1Title || '') !== (o.section1Title || '') ||
            (p.section1Description || '') !== (o.section1Description || '') ||
            (p.section1MoreText || '') !== (o.section1MoreText || '') ||
            (p.section2Title || '') !== (o.section2Title || '') ||
            (p.section2Description || '') !== (o.section2Description || '') ||
            (p.section2MoreText || '') !== (o.section2MoreText || '') ||
            (p.section3Title || '') !== (o.section3Title || '') ||
            (p.section3Description || '') !== (o.section3Description || '') ||
            (p.section3MoreText || '') !== (o.section3MoreText || '')
        );
    };

    const saveProduct = async (id) => {
        const p = products.find(x => x.id === id);
        if (!p) return;
        try {
            const res = await fetch(`${API}/products/${id}`, {
                method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                    name: p.name || '',
                    subtext: p.subtext || '',
                    imageUrl: p.imageUrl || '',
                    detailDescription: p.detailDescription || '',
                    section1Title: p.section1Title || '',
                    section1Description: p.section1Description || '',
                    section1MoreText: p.section1MoreText || '',
                    section2Title: p.section2Title || '',
                    section2Description: p.section2Description || '',
                    section2MoreText: p.section2MoreText || '',
                    section3Title: p.section3Title || '',
                    section3Description: p.section3Description || '',
                    section3MoreText: p.section3MoreText || ''
                })
            });
            if (!res.ok) throw new Error('Save failed');
            const saved = await res.json();
            setOriginalById(prev => ({ ...prev, [id]: { ...saved } }));
        } catch (e) { alert(e.message); }
    };

    const undoProduct = (id) => {
        const o = originalById[id];
        if (!o) return;
        setProducts(prev => prev.map(x => x.id === id ? { ...o } : x));
    };

    // entity delete removed from UI per request; keep API helpers minimal
    // images API
    const refreshImages = async (productId) => {
        try {
            const res = await fetch(`${API}/products/${productId}/images`);
            if (!res.ok) return;
            const imgs = await res.json();
            setProducts(prev => prev.map(x => x.id === productId ? { ...x, images: imgs } : x));
        } catch { }
    };

    const removeImage = async (productId, imageId) => {
        if (!confirm('Şəkil silinsin?')) return;
        try {
            const res = await fetch(`${API}/products/${productId}/images/${imageId}`, { method: 'DELETE' });
            if (res.status !== 204) throw new Error('Delete image failed');
            await refreshImages(productId);
        } catch (e) { alert(e.message); }
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

            {/* Products cards (modeled after equipment cards) */}
            {error && <div className="text-danger">{error}</div>}
            {loading && <div>Yüklənir...</div>}

            {products.map((p, idx) => (
                <div key={p.id} className="admin-about-card p-3 mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="slide-indicator">Slide {idx + 1}</div>
                        <div className="top-actions d-flex gap-2">
                            {/* intentionally no entity delete here */}
                        </div>
                    </div>

                    <div className="row g-3 align-items-start">
                        <div className="col-12 col-lg-8 d-flex flex-column gap-3">
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">ID</label>
                                <div className="col-sm-9">
                                    <div className="form-control-plaintext">{String(p.id).padStart(2, '0')}</div>
                                </div>
                            </div>
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">Heading</label>
                                <div className="col-sm-9">
                                    <input className="form-control" value={p.name || ''} onChange={(e) => setProducts(prev => prev.map(x => x.id === p.id ? { ...x, name: e.target.value } : x))} />
                                </div>
                            </div>
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">Subtext</label>
                                <div className="col-sm-9">
                                    <textarea className="form-control" rows={5} value={p.subtext || ''} onChange={(e) => setProducts(prev => prev.map(x => x.id === p.id ? { ...x, subtext: e.target.value } : x))} />
                                </div>
                            </div>
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">Image URL</label>
                                <div className="col-sm-9">
                                    <input className="form-control" value={p.imageUrl || ''} onChange={(e) => setProducts(prev => prev.map(x => x.id === p.id ? { ...x, imageUrl: e.target.value } : x))} />
                                </div>
                            </div>
                            {/* Section 1 */}
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">Section 1 Title</label>
                                <div className="col-sm-9">
                                    <input className="form-control" value={p.section1Title || ''} onChange={(e) => setProducts(prev => prev.map(x => x.id === p.id ? { ...x, section1Title: e.target.value } : x))} />
                                </div>
                            </div>
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">Section 1 Description</label>
                                <div className="col-sm-9">
                                    <textarea className="form-control" rows={4} value={p.section1Description || ''} onChange={(e) => setProducts(prev => prev.map(x => x.id === p.id ? { ...x, section1Description: e.target.value } : x))} />
                                </div>
                            </div>
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">Section 1 More</label>
                                <div className="col-sm-9">
                                    <textarea className="form-control" rows={3} value={p.section1MoreText || ''} onChange={(e) => setProducts(prev => prev.map(x => x.id === p.id ? { ...x, section1MoreText: e.target.value } : x))} />
                                </div>
                            </div>

                            {/* Section 2 */}
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">Section 2 Title</label>
                                <div className="col-sm-9">
                                    <input className="form-control" value={p.section2Title || ''} onChange={(e) => setProducts(prev => prev.map(x => x.id === p.id ? { ...x, section2Title: e.target.value } : x))} />
                                </div>
                            </div>
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">Section 2 Description</label>
                                <div className="col-sm-9">
                                    <textarea className="form-control" rows={4} value={p.section2Description || ''} onChange={(e) => setProducts(prev => prev.map(x => x.id === p.id ? { ...x, section2Description: e.target.value } : x))} />
                                </div>
                            </div>
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">Section 2 More</label>
                                <div className="col-sm-9">
                                    <textarea className="form-control" rows={3} value={p.section2MoreText || ''} onChange={(e) => setProducts(prev => prev.map(x => x.id === p.id ? { ...x, section2MoreText: e.target.value } : x))} />
                                </div>
                            </div>

                            {/* Section 3 */}
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">Section 3 Title</label>
                                <div className="col-sm-9">
                                    <input className="form-control" value={p.section3Title || ''} onChange={(e) => setProducts(prev => prev.map(x => x.id === p.id ? { ...x, section3Title: e.target.value } : x))} />
                                </div>
                            </div>
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">Section 3 Description</label>
                                <div className="col-sm-9">
                                    <textarea className="form-control" rows={4} value={p.section3Description || ''} onChange={(e) => setProducts(prev => prev.map(x => x.id === p.id ? { ...x, section3Description: e.target.value } : x))} />
                                </div>
                            </div>
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">Section 3 More</label>
                                <div className="col-sm-9">
                                    <textarea className="form-control" rows={3} value={p.section3MoreText || ''} onChange={(e) => setProducts(prev => prev.map(x => x.id === p.id ? { ...x, section3MoreText: e.target.value } : x))} />
                                </div>
                            </div>

                            <div className="d-flex gap-2">
                                <button className="btn btn-primary" disabled={!hasChanges(p)} onClick={() => saveProduct(p.id)}>Yadda saxla</button>
                                <button className="btn btn-outline-light" disabled={!hasChanges(p)} onClick={() => undoProduct(p.id)}>Undo</button>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4">
                            <div className="image-upload-container d-flex flex-column gap-2">
                                <div className="image-placeholder position-relative">
                                    {p.imageUrl && <img src={resolveUrl(p.imageUrl)} alt={p.alt || p.name} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 12 }} />}
                                    <div className="image-actions position-absolute">
                                        <button className="action-btn delete-img" aria-label="Delete image" onClick={() => setProducts(prev => prev.map(x => x.id === p.id ? { ...x, imageUrl: '' } : x))}>
                                            <img src="/assets/admin-trash.png" alt="Delete" />
                                        </button>
                                        <button className="action-btn refresh-img" aria-label="Refresh image" onClick={() => undoProduct(p.id)}>
                                            <img src="/assets/admin-refresh.png" alt="Refresh" />
                                        </button>
                                    </div>
                                </div>
                                <div className="image-info">*Yüklənən şəkil aaa x bbb ölçüsündə olmalıdır</div>
                                {Array.isArray(p.images) && p.images.length > 0 && (
                                    <div className="thumbs-strip mt-2">
                                        {p.images.map(img => (
                                            <div key={img.id} className="thumb-tile">
                                                <img src={resolveUrl(img.imageUrl)} alt={img.alt || ''} />
                                                <div className="thumb-actions">
                                                    <button className="action-btn" title="Sil" onClick={() => removeImage(p.id, img.id)}>
                                                        <img src="/assets/admin-trash.png" alt="Del" />
                                                    </button>
                                                    <button className="action-btn" onClick={async () => { await fetch(`${API}/products/${p.id}/images/${img.id}/set-main`, { method: 'PUT' }); await loadProducts(); }} title="Əsas et" style={{ background: 'linear-gradient(90deg, #17DBFC, #467EFE)' }}>
                                                        ★
                                                    </button>
                                                </div>
                                                <button className="thumb-edit-btn" title="Redaktə et" onClick={async () => {
                                                    const input = document.createElement('input');
                                                    input.type = 'file';
                                                    input.accept = 'image/*';
                                                    input.onchange = async (ev) => {
                                                        const file = ev.target.files && ev.target.files[0];
                                                        if (!file) return;
                                                        const form = new FormData();
                                                        form.append('file', file);
                                                        try {
                                                            const res = await fetch(`${API}/upload/product/${p.id}`, { method: 'POST', body: form });
                                                            if (!res.ok) throw new Error('Yükləmə alınmadı');
                                                            const { url } = await res.json();
                                                            const upd = await fetch(`${API}/products/${p.id}/images/${img.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageUrl: url, alt: img.alt || '', orderIndex: img.orderIndex ?? 0 }) });
                                                            if (!upd.ok) throw new Error('Yeniləmə alınmadı');
                                                            await refreshImages(p.id);
                                                        } catch (err) { alert(err.message); }
                                                    };
                                                    input.click();
                                                }}>✎</button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="thumb-add mt-2">
                                    <input type="file" className="form-control" onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        const form = new FormData();
                                        form.append('file', file);
                                        try {
                                            const res = await fetch(`${API}/upload/product/${p.id}`, { method: 'POST', body: form });
                                            if (!res.ok) throw new Error('Upload failed');
                                            const { url } = await res.json();
                                            // create ProductImage row with returned URL
                                            const r2 = await fetch(`${API}/products/${p.id}/images`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageUrl: url, alt: '' }) });
                                            if (!r2.ok) throw new Error('Add image failed');
                                            await refreshImages(p.id);
                                        } catch (err) {
                                            alert(err.message);
                                        } finally {
                                            e.target.value = '';
                                        }
                                    }} />
                                    <button className="btn btn-outline-light" disabled>Fayl ilə əlavə et</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

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
                                <label className="form-label">Məhsul Adı <span style={{ color: '#ff4d4f' }}>*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Məhsul adını daxil edin"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Məhsul Təsviri (Subtext) <span style={{ color: '#ff4d4f' }}>*</span></label>
                                <textarea className="form-control" rows="3" placeholder="Qısa təsvir" value={newProduct.subtext} onChange={(e) => setNewProduct({ ...newProduct, subtext: e.target.value })} required />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Ətraflı Təsvir <span style={{ color: '#ff4d4f' }}>*</span></label>
                                <textarea className="form-control" rows="4" placeholder="Ətraflı təsvir" value={newProduct.detailDescription} onChange={(e) => setNewProduct({ ...newProduct, detailDescription: e.target.value })} required />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Section 1 Title</label>
                                <input className="form-control" value={newProduct.section1Title} onChange={(e) => setNewProduct({ ...newProduct, section1Title: e.target.value })} />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Section 1 Description</label>
                                <textarea className="form-control" rows="3" value={newProduct.section1Description} onChange={(e) => setNewProduct({ ...newProduct, section1Description: e.target.value })} />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Section 1 More</label>
                                <textarea className="form-control" rows="3" value={newProduct.section1MoreText} onChange={(e) => setNewProduct({ ...newProduct, section1MoreText: e.target.value })} />
                            </div>

                            {/* Section 2 */}
                            <div className="form-group mb-3">
                                <label className="form-label">Section 2 Title</label>
                                <input className="form-control" value={newProduct.section2Title} onChange={(e) => setNewProduct({ ...newProduct, section2Title: e.target.value })} />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Section 2 Description</label>
                                <textarea className="form-control" rows="3" value={newProduct.section2Description} onChange={(e) => setNewProduct({ ...newProduct, section2Description: e.target.value })} />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Section 2 More</label>
                                <textarea className="form-control" rows="3" value={newProduct.section2MoreText} onChange={(e) => setNewProduct({ ...newProduct, section2MoreText: e.target.value })} />
                            </div>

                            {/* Section 3 */}
                            <div className="form-group mb-3">
                                <label className="form-label">Section 3 Title</label>
                                <input className="form-control" value={newProduct.section3Title} onChange={(e) => setNewProduct({ ...newProduct, section3Title: e.target.value })} />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Section 3 Description</label>
                                <textarea className="form-control" rows="3" value={newProduct.section3Description} onChange={(e) => setNewProduct({ ...newProduct, section3Description: e.target.value })} />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Section 3 More</label>
                                <textarea className="form-control" rows="3" value={newProduct.section3MoreText} onChange={(e) => setNewProduct({ ...newProduct, section3MoreText: e.target.value })} />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Şəkil <span style={{ color: '#ff4d4f' }}>*</span></label>
                                <div className="image-upload-container">
                                    <div className="image-placeholder position-relative" style={{ minHeight: 180 }}>
                                        {newImagePreview ? (
                                            <img src={newImagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 12 }} />
                                        ) : (
                                            <div className="text-muted d-flex align-items-center justify-content-center" style={{ height: '100%' }}>Şəkil seçilməyib</div>
                                        )}
                                        <div className="image-actions position-absolute">
                                            <button className="action-btn delete-img" aria-label="Delete image" onClick={() => { setNewImageFile(null); setNewImagePreview(''); }}>
                                                <img src="/assets/admin-trash.png" alt="Delete" />
                                            </button>
                                            <button className="action-btn refresh-img" aria-label="Browse image" onClick={() => document.getElementById('new-product-file')?.click()}>
                                                <img src="/assets/admin-refresh.png" alt="Browse" />
                                            </button>
                                        </div>
                                    </div>
                                    <input id="new-product-file" type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => {
                                        const f = e.target.files?.[0] || null;
                                        setNewImageFile(f);
                                        setNewImagePreview(f ? URL.createObjectURL(f) : '');
                                    }} />
                                    <div className="image-info">*Yüklənən şəkil ölçüsü uyğun olmalıdır</div>
                                </div>
                            </div>

                            {/* Icon uploader using refresh as browse */}
                            <div className="form-group mb-3">
                                <label className="form-label">İkon <span style={{ color: '#ff4d4f' }}>*</span></label>
                                <div className="image-upload-container">
                                    <div className="image-placeholder position-relative" style={{ minHeight: 120 }}>
                                        {newIconPreview ? (
                                            <img src={newIconPreview} alt="Icon Preview" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 12 }} />
                                        ) : (
                                            <div className="text-muted d-flex align-items-center justify-content-center" style={{ height: '100%' }}>İkon seçilməyib</div>
                                        )}
                                        <div className="image-actions position-absolute">
                                            <button className="action-btn delete-img" aria-label="Delete icon" onClick={() => { setNewIconFile(null); setNewIconPreview(''); }}>
                                                <img src="/assets/admin-trash.png" alt="Del" />
                                            </button>
                                            <button className="action-btn refresh-img" aria-label="Browse icon" onClick={() => document.getElementById('new-product-icon')?.click()}>
                                                <img src="/assets/admin-refresh.png" alt="Browse" />
                                            </button>
                                        </div>
                                    </div>
                                    <input id="new-product-icon" type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => {
                                        const f = e.target.files?.[0] || null;
                                        setNewIconFile(f);
                                        setNewIconPreview(f ? URL.createObjectURL(f) : '');
                                    }} />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={handleCloseModal}>
                                Ləğv et
                            </button>
                            <button className="btn btn-primary" onClick={createProduct} disabled={creating || !isCreateValid()}>
                                {creating ? 'Yaradılır...' : 'Əlavə et'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}