import React, { useEffect, useState } from 'react';
import './AdminServices.css';
import './AdminAbout.css';

const API = 'http://localhost:5098/api';

export default function AdminServices() {
    const [services, setServices] = useState([]);
    const [originalById, setOriginalById] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [newService, setNewService] = useState({ name: '', subtitle: '', description: '', icon: '', detailImage: '', imageUrl: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadServices = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API}/services`);
            if (!res.ok) throw new Error('Failed to load services');
            const data = await res.json();
            setServices(data);
            const map = {}; data.forEach(s => map[s.id] = { ...s });
            setOriginalById(map);
        } catch (e) { setError(e.message); } finally { setLoading(false); }
    };

    useEffect(() => { loadServices(); }, []);

    const handleAddService = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewService({ name: '', subtext: '' });
    };

    const createService = async () => {
        try {
            const res = await fetch(`${API}/services`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: newService.name, subtitle: newService.subtitle, description: newService.description, icon: newService.icon, detailImage: newService.detailImage, imageUrl: newService.imageUrl }) });
            if (!res.ok) throw new Error('Create failed');
            handleCloseModal();
            await loadServices();
        } catch (e) { alert(e.message); }
    };

    const hasChanges = (s) => {
        const o = originalById[s.id];
        if (!o) return false;
        return (
            (s.name || '') !== (o.name || '') ||
            (s.subtitle || '') !== (o.subtitle || '') ||
            (s.description || '') !== (o.description || '') ||
            (s.icon || '') !== (o.icon || '') ||
            (s.detailImage || '') !== (o.detailImage || '') ||
            (s.imageUrl || '') !== (o.imageUrl || '')
        );
    };

    const saveService = async (id) => {
        const s = services.find(x => x.id === id);
        if (!s) return;
        try {
            const res = await fetch(`${API}/services/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: s.name, subtitle: s.subtitle, description: s.description, icon: s.icon, detailImage: s.detailImage, imageUrl: s.imageUrl }) });
            if (!res.ok) throw new Error('Save failed');
            const saved = await res.json();
            setOriginalById(prev => ({ ...prev, [id]: { ...saved } }));
        } catch (e) { alert(e.message); }
    };

    const undoService = (id) => {
        const o = originalById[id];
        if (!o) return;
        setServices(prev => prev.map(x => x.id === id ? { ...o } : x));
    };

    return (
        <div className="admin-services-container admin-about-container container-fluid">
            <div className="admin-services-header d-flex justify-content-between align-items-center mb-3 pt-3" style={{ padding: '0 15px' }}>
                <h2 className="m-0">Xidmətlər</h2>
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
                            style={{ paddingLeft: '40px' }}
                        />
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="2"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                    </div>
                    <button className="add-btn btn d-flex align-items-center gap-2" onClick={handleAddService}>
                        <span style={{ fontSize: '16px' }}>+</span>
                        Əlavə et
                    </button>
                </div>
            </div>

            {error && <div className="text-danger">{error}</div>}
            {loading && <div>Yüklənir...</div>}
            {services.map((s, idx) => (
                <div key={s.id} className="admin-about-card p-3 mb-4">
                    <div className="row g-3 align-items-start">
                        <div className="col-12 col-lg-8 d-flex flex-column gap-3">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="text-white m-0">Service {String(s.id).padStart(2, '0')}</h5>
                            </div>
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">Name</label>
                                <div className="col-sm-9"><input className="form-control" value={s.name || ''} onChange={(e) => setServices(prev => prev.map(x => x.id === s.id ? { ...x, name: e.target.value } : x))} /></div>
                            </div>
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">Subtitle</label>
                                <div className="col-sm-9"><input className="form-control" value={s.subtitle || ''} onChange={(e) => setServices(prev => prev.map(x => x.id === s.id ? { ...x, subtitle: e.target.value } : x))} /></div>
                            </div>
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">Description</label>
                                <div className="col-sm-9"><textarea className="form-control" rows={6} value={s.description || ''} onChange={(e) => setServices(prev => prev.map(x => x.id === s.id ? { ...x, description: e.target.value } : x))} /></div>
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-primary" disabled={!hasChanges(s)} onClick={() => saveService(s.id)}>Yadda saxla</button>
                                <button className="btn btn-outline-light" disabled={!hasChanges(s)} onClick={() => undoService(s.id)}>Undo</button>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4">
                            <div className="image-upload-container d-flex flex-column gap-2">
                                <div className="image-placeholder position-relative">
                                    {s.detailImage && <img src={s.detailImage} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 12 }} />}
                                    <div className="image-actions position-absolute">
                                        <button className="action-btn delete-img" aria-label="Delete image" onClick={() => setServices(prev => prev.map(x => x.id === s.id ? { ...x, detailImage: '' } : x))}>
                                            <img src="/assets/admin-trash.png" alt="Delete" />
                                        </button>
                                        <button className="action-btn refresh-img" aria-label="Refresh image" onClick={() => undoService(s.id)}>
                                            <img src="/assets/admin-refresh.png" alt="Refresh" />
                                        </button>
                                    </div>
                                </div>
                                <div className="image-info">*Yüklənən şəkil aaa x bbb ölçüsündə olmalıdır</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Second Service */}
            <div className="admin-about-card p-3 mb-4">
                <div className="row g-3 align-items-start">
                    <div className="col-12 col-lg-8 d-flex flex-column gap-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="text-white m-0">Service 02</h5>
                        </div>

                        {/* Service ID (Fancy Badge) */}
                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">ID</label>
                            <div className="col-sm-9">
                                <div className="service-id-badge">
                                    <span className="id-number">02</span>
                                </div>
                            </div>
                        </div>

                        {/* Service Name */}
                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Name</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Satış və Kassa idarəetməsi"
                                    defaultValue="Satış və Kassa idarəetməsi"
                                />
                            </div>
                        </div>

                        {/* Service Subtext */}
                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Subtext</label>
                            <div className="col-sm-9">
                                <textarea
                                    className="form-control"
                                    rows={6}
                                    placeholder="Mətn..."
                                    defaultValue="Satış nöqtəsinin idarə olunması, satış tempinə nəzarət və müxtəlif mal qruplarına görə çeşidləmə imkanı mövcuddur."
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
            </div>

            {/* Third Service */}
            <div className="admin-about-card p-3 mb-4">
                <div className="row g-3 align-items-start">
                    <div className="col-12 col-lg-8 d-flex flex-column gap-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="text-white m-0">Service 03</h5>
                        </div>

                        {/* Service ID (Fancy Badge) */}
                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">ID</label>
                            <div className="col-sm-9">
                                <div className="service-id-badge">
                                    <span className="id-number">03</span>
                                </div>
                            </div>
                        </div>

                        {/* Service Name */}
                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Name</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Müştəri və CRM idarəetməsi"
                                    defaultValue="Müştəri və CRM idarəetməsi"
                                />
                            </div>
                        </div>

                        {/* Service Subtext */}
                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Subtext</label>
                            <div className="col-sm-9">
                                <textarea
                                    className="form-control"
                                    rows={6}
                                    placeholder="Mətn..."
                                    defaultValue="Müştəri məlumatları (təhsil, peşə və s.) sistemə daxil edilə bilər."
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
            </div>

            {/* Add Service Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">Yeni Xidmət Əlavə Et</h3>
                            <button className="modal-close" onClick={handleCloseModal}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="form-group mb-3">
                                <label className="form-label">Xidmət Adı</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Xidmət adını daxil edin"
                                    value={newService.name}
                                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Xidmət Təsviri</label>
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    placeholder="Xidmət təsvirini daxil edin"
                                    value={newService.subtext}
                                    onChange={(e) => setNewService({ ...newService, subtext: e.target.value })}
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
                            <button className="btn btn-primary" onClick={createService}>
                                Əlavə et
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
