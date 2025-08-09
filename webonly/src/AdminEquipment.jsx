import React, { useEffect, useState } from 'react';
import './AdminEquipment.css';
import './AdminAbout.css';

const API = 'http://localhost:5098/api';

export default function AdminEquipment() {
    const [equipments, setEquipments] = useState([]);
    const [originalById, setOriginalById] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ name: '', version: '', core: '', description: '', imageUrl: '' });

    const resetForm = () => setForm({ name: '', version: '', core: '', description: '', imageUrl: '' });

    const loadEquipments = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API}/equipment/full`);
            if (!res.ok) throw new Error('Failed to load equipment');
            const data = await res.json();
            setEquipments(data);
            const map = {};
            data.forEach(it => { map[it.id] = { ...it }; });
            setOriginalById(map);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEquipments();
    }, []);

    const openCreate = () => {
        setEditingId(null);
        resetForm();
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingId(null);
        resetForm();
    };

    const submitForm = async () => {
        try {
            const method = editingId ? 'PUT' : 'POST';
            const url = editingId ? `${API}/equipment/${editingId}` : `${API}/equipment`;
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (!res.ok) throw new Error('Save failed');
            closeModal();
            await loadEquipments();
        } catch (e) {
            alert(e.message);
        }
    };

    const submitFormForId = async (id) => {
        const item = equipments.find(x => x.id === id);
        if (!item) return;
        try {
            const res = await fetch(`${API}/equipment/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: item.name || '',
                    version: item.version || '',
                    core: item.core || '',
                    description: item.description || '',
                    imageUrl: item.imageUrl || ''
                })
            });
            if (!res.ok) throw new Error('Save failed');
            const saved = await res.json();
            setOriginalById(prev => ({ ...prev, [id]: { ...saved } }));
        } catch (e) {
            alert(e.message);
        }
    };

    const undoChanges = (id) => {
        const orig = originalById[id];
        if (!orig) return;
        setEquipments(prev => prev.map(x => x.id === id ? { ...orig } : x));
    };

    const hasChanges = (e) => {
        const o = originalById[e.id];
        if (!o) return false;
        return (
            (e.name || '') !== (o.name || '') ||
            (e.version || '') !== (o.version || '') ||
            (e.core || '') !== (o.core || '') ||
            (e.description || '') !== (o.description || '') ||
            (e.imageUrl || '') !== (o.imageUrl || '')
        );
    };

    const remove = async (id) => {
        if (!confirm('Silinsin?')) return;
        try {
            const res = await fetch(`${API}/equipment/${id}`, { method: 'DELETE' });
            if (res.status !== 204) throw new Error('Delete failed');
            await loadEquipments();
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <div className="admin-equipment-container admin-about-container container-fluid">
            <div className="admin-equipment-header d-flex justify-content-between align-items-center mb-3 pt-3" style={{ padding: '0 15px' }}>
                <h2 className="m-0">Avadanlıqlar</h2>
                <div className="d-flex gap-3 align-items-center" style={{ minWidth: 'fit-content' }}>
                    <button className="add-btn btn d-flex align-items-center gap-2" onClick={openCreate}>
                        <span style={{ fontSize: '16px' }}>+</span>
                        Əlavə et
                    </button>
                </div>
            </div>

            {error && <div className="text-danger">{error}</div>}
            {loading && <div>Yüklənir...</div>}

            {equipments.map((e, idx) => (
                <div key={e.id} className="admin-about-card p-3 mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="slide-indicator">Slide {idx + 1}</div>
                        <div className="top-actions d-flex gap-2">
                            <button className="btn btn-outline-light" onClick={() => remove(e.id)} aria-label="Delete">Sil</button>
                        </div>
                    </div>

                    <div className="row g-3 align-items-start">
                        <div className="col-12 col-lg-8 d-flex flex-column gap-3">
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">Name</label>
                                <div className="col-sm-9">
                                    <input className="form-control" value={e.name || ''} onChange={(ev) => setEquipments(prev => prev.map(x => x.id === e.id ? { ...x, name: ev.target.value } : x))} />
                                </div>
                            </div>
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">Version</label>
                                <div className="col-sm-9">
                                    <input className="form-control" value={e.version || ''} onChange={(ev) => setEquipments(prev => prev.map(x => x.id === e.id ? { ...x, version: ev.target.value } : x))} />
                                </div>
                            </div>
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">Core</label>
                                <div className="col-sm-9">
                                    <input className="form-control" value={e.core || ''} onChange={(ev) => setEquipments(prev => prev.map(x => x.id === e.id ? { ...x, core: ev.target.value } : x))} />
                                </div>
                            </div>
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">Description</label>
                                <div className="col-sm-9">
                                    <textarea className="form-control" rows={4} value={e.description || ''} onChange={(ev) => setEquipments(prev => prev.map(x => x.id === e.id ? { ...x, description: ev.target.value } : x))} />
                                </div>
                            </div>
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">Image URL</label>
                                <div className="col-sm-9">
                                    <input className="form-control" value={e.imageUrl || ''} onChange={(ev) => setEquipments(prev => prev.map(x => x.id === e.id ? { ...x, imageUrl: ev.target.value } : x))} />
                                </div>
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-primary" disabled={!hasChanges(e)} onClick={() => submitFormForId(e.id)}>Yadda saxla</button>
                                <button className="btn btn-outline-light" disabled={!hasChanges(e)} onClick={() => undoChanges(e.id)}>Undo</button>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4">
                            <div className="image-upload-container d-flex flex-column gap-2">
                                <div className="image-placeholder position-relative" style={{ minHeight: 300 }}>
                                    {e.imageUrl && <img src={e.imageUrl} alt={e.name} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 12 }} />}
                                    <div className="image-actions position-absolute" style={{ left: '-52px', bottom: '30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <button className="action-btn delete-img" aria-label="Delete image" onClick={() => setEquipments(prev => prev.map(x => x.id === e.id ? { ...x, imageUrl: '' } : x))}>
                                            <img src="/assets/admin-trash.png" alt="Delete" />
                                        </button>
                                        <button className="action-btn refresh-img" aria-label="Refresh image" onClick={() => undoChanges(e.id)}>
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

            {/* Modal for create only */}
            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">Yeni Avadanlıq Əlavə Et</h3>
                            <button className="modal-close" onClick={closeModal}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group mb-3"><label className="form-label">Ad</label><input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                            <div className="row g-3">
                                <div className="col-md-6"><label className="form-label">Versiya</label><input className="form-control" value={form.version} onChange={(e) => setForm({ ...form, version: e.target.value })} /></div>
                                <div className="col-md-6"><label className="form-label">Core</label><input className="form-control" value={form.core} onChange={(e) => setForm({ ...form, core: e.target.value })} /></div>
                            </div>
                            <div className="form-group mb-3 mt-3"><label className="form-label">Təsvir</label><textarea className="form-control" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
                            <div className="form-group mb-3"><label className="form-label">Şəkil URL</label><input className="form-control" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} /></div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={closeModal}>Ləğv et</button>
                            <button className="btn btn-primary" onClick={submitForm}>Əlavə et</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
