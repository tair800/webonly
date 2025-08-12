import React, { useEffect, useState, useRef } from 'react';
import './AdminEquipment.css';
import './AdminAbout.css';
import Swal from 'sweetalert2';

const API = 'http://localhost:5098/api';

export default function AdminEquipment() {
    const [equipments, setEquipments] = useState([]);
    const [originalById, setOriginalById] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);

    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ name: '', version: '', core: '', description: '', imageUrl: '', imageFile: null });

    // File input refs for browse functionality
    const imageFileRefs = useRef({});

    const resolveUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('/uploads/')) return `http://localhost:5098${url}`;
        return url;
    };

    const resetForm = () => setForm({ name: '', version: '', core: '', description: '', imageUrl: '', imageFile: null });

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
            setCurrentPage(1); // Reset to first page when loading new data
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    // Pagination functions
    const totalPages = Math.max(1, Math.ceil(equipments.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentEquipments = equipments.slice(startIndex, endIndex);

    const goToPage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
        // Validate required fields
        if (!form.name?.trim() || !form.version?.trim() || !form.core?.trim() || !form.description?.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Diqqət!',
                text: 'Zəhmət olmasa bütün məcburi sahələri doldurun!',
                confirmButtonText: 'Tamam'
            });
            return;
        }

        setSubmitting(true);
        try {
            const method = editingId ? 'PUT' : 'POST';
            const url = editingId ? `${API}/equipment/${editingId}` : `${API}/equipment`;

            // Handle image upload if there's a file
            let finalImageUrl = form.imageUrl;

            if (form.imageFile) {
                try {
                    // Create a temporary equipment to get an ID for upload
                    const tempRes = await fetch(`${API}/equipment`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            name: form.name,
                            version: form.version,
                            core: form.core,
                            description: form.description,
                            imageUrl: ''
                        })
                    });

                    if (!tempRes.ok) throw new Error('Failed to create temporary equipment for image upload');
                    const tempEquipment = await tempRes.json();

                    // Upload image
                    const uploadForm = new FormData();
                    uploadForm.append('file', form.imageFile);
                    const uploadRes = await fetch(`${API}/upload/equipment/${tempEquipment.id}`, {
                        method: 'POST',
                        body: uploadForm
                    });

                    if (uploadRes.ok) {
                        const { url } = await uploadRes.json();
                        finalImageUrl = url;
                    } else {
                        console.error('Image upload failed:', uploadRes.status, uploadRes.statusText);
                    }

                    // Now update the equipment with the final image URL
                    const updateRes = await fetch(`${API}/equipment/${tempEquipment.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            name: form.name,
                            version: form.version,
                            core: form.core,
                            description: form.description,
                            imageUrl: finalImageUrl
                        })
                    });

                    if (updateRes.ok) {
                        const created = await updateRes.json();

                        await Swal.fire({
                            icon: 'success',
                            title: 'Uğurlu!',
                            text: 'Yeni avadanlıq əlavə edildi!',
                            confirmButtonText: 'Tamam'
                        });

                        closeModal();
                        await loadEquipments();
                        return;
                    }

                } catch (uploadError) {
                    console.error('Image upload error:', uploadError);
                    Swal.fire('Xəta!', 'Şəkil yükləmə zamanı xəta baş verdi', 'error');
                    return;
                }
            } else {
                // No image file, create directly
                const body = {
                    name: form.name,
                    version: form.version,
                    core: form.core,
                    description: form.description,
                    imageUrl: form.imageUrl
                };
                const res = await fetch(url, {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });

                if (!res.ok) throw new Error('Save failed');

                await Swal.fire({
                    icon: 'success',
                    title: 'Uğurlu!',
                    text: editingId ? 'Avadanlıq yeniləndi!' : 'Yeni avadanlıq əlavə edildi!',
                    confirmButtonText: 'Tamam'
                });

                closeModal();
                await loadEquipments();
            }
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Xəta!',
                text: e.message,
                confirmButtonText: 'Tamam'
            });
        } finally {
            setSubmitting(false);
        }
    };

    const submitFormForId = async (id) => {
        const item = equipments.find(x => x.id === id);
        if (!item) return;

        // Validate required fields
        if (!item.name?.trim() || !item.version?.trim() || !item.core?.trim() || !item.description?.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Diqqət!',
                text: 'Zəhmət olmasa bütün məcburi sahələri doldurun!',
                confirmButtonText: 'Tamam'
            });
            return;
        }

        setSubmitting(true);
        try {
            // Always use JSON for updates
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

            Swal.fire({
                icon: 'success',
                title: 'Uğurlu!',
                text: 'Avadanlıq yeniləndi!',
                confirmButtonText: 'Tamam'
            });
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Xəta!',
                text: e.message,
                confirmButtonText: 'Tamam'
            });
        } finally {
            setSubmitting(false);
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
        const result = await Swal.fire({
            title: 'Əminsiniz?',
            text: 'Bu avadanlıq silinəcək!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Bəli, sil!',
            cancelButtonText: 'Ləğv et'
        });

        if (result.isConfirmed) {
            setSubmitting(true);
            try {
                const res = await fetch(`${API}/equipment/${id}`, { method: 'DELETE' });
                if (res.status !== 204) throw new Error('Delete failed');

                await Swal.fire({
                    icon: 'success',
                    title: 'Silindi!',
                    text: 'Avadanlıq uğurla silindi.',
                    confirmButtonText: 'Tamam'
                });

                await loadEquipments();
            } catch (e) {
                Swal.fire({
                    icon: 'error',
                    title: 'Xəta!',
                    text: e.message,
                    confirmButtonText: 'Tamam'
                });
            } finally {
                setSubmitting(false);
            }
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

            {currentEquipments.map((e, idx) => (
                <div key={e.id} className="admin-about-card p-3 mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="slide-indicator">Slide {startIndex + idx + 1}</div>
                        <div className="top-actions d-flex gap-2">
                            <button className="btn btn-outline-light" onClick={() => remove(e.id)} disabled={submitting} aria-label="Delete">
                                {submitting ? 'Silinir...' : 'Sil'}
                            </button>
                        </div>
                    </div>

                    <div className="row g-3 align-items-start">
                        <div className="col-12 col-lg-8 d-flex flex-column gap-3">
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">Name *</label>
                                <div className="col-sm-9">
                                    <input className="form-control" value={e.name || ''} onChange={(ev) => setEquipments(prev => prev.map(x => x.id === e.id ? { ...x, name: ev.target.value } : x))} />
                                </div>
                            </div>
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">Version *</label>
                                <div className="col-sm-9">
                                    <input className="form-control" value={e.version || ''} onChange={(ev) => setEquipments(prev => prev.map(x => x.id === e.id ? { ...x, version: ev.target.value } : x))} />
                                </div>
                            </div>
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">Core *</label>
                                <div className="col-sm-9">
                                    <input className="form-control" value={e.core || ''} onChange={(ev) => setEquipments(prev => prev.map(x => x.id === e.id ? { ...x, core: ev.target.value } : x))} />
                                </div>
                            </div>
                            <div className="form-group row g-3 align-items-start">
                                <label className="col-sm-3 col-form-label">Description *</label>
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
                                <button className="btn btn-primary" disabled={!hasChanges(e) || submitting} onClick={() => submitFormForId(e.id)}>
                                    {submitting ? 'Yadda saxlanır...' : 'Yadda saxla'}
                                </button>
                                <button className="btn btn-outline-light" disabled={!hasChanges(e) || submitting} onClick={() => undoChanges(e.id)}>Undo</button>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4">
                            <div className="image-upload-container d-flex flex-column gap-2">
                                <div className="image-placeholder position-relative" style={{ minHeight: 300 }}>
                                    {e.imageUrl ? (
                                        <img src={resolveUrl(e.imageUrl)} alt={e.name} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 12 }} />
                                    ) : (
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: '#f8f9fa',
                                            borderRadius: 12,
                                            border: '2px dashed #dee2e6',
                                            color: '#6c757d'
                                        }}>
                                            No Image Available
                                        </div>
                                    )}
                                    <div className="image-actions position-absolute" style={{ left: '-52px', bottom: '30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <button className="action-btn delete-img" aria-label="Delete image" onClick={() => setEquipments(prev => prev.map(x => x.id === e.id ? { ...x, imageUrl: '', imageFile: null } : x))}>
                                            <img src="/assets/admin-trash.png" alt="Delete" />
                                        </button>
                                        <button className="action-btn refresh-img" aria-label="Browse image" onClick={() => document.getElementById(`equipment-image-${e.id}`)?.click()}>
                                            <img src="/assets/admin-refresh.png" alt="Browse" />
                                        </button>
                                    </div>
                                </div>
                                <input
                                    id={`equipment-image-${e.id}`}
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={(ev) => {
                                        const file = ev.target.files?.[0];
                                        if (file) {
                                            const imageUrl = URL.createObjectURL(file);
                                            setEquipments(prev => prev.map(x => x.id === e.id ? { ...x, imageUrl, imageFile: file } : x));
                                        }
                                    }}
                                />
                                <div className="image-info">*Yüklənən şəkil aaa x bbb ölçüsündə olmalıdır. Yeniləmə düyməsi şəkil seçmək üçündür.</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Pagination UI */}
            <div className="d-flex justify-content-center mt-4">
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={goToPreviousPage} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => goToPage(i + 1)}>{i + 1}</button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={goToNextPage} aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

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
                            <div className="form-group mb-3"><label className="form-label">Ad *</label><input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                            <div className="row g-3">
                                <div className="col-md-6"><label className="form-label">Versiya *</label><input className="form-control" value={form.version} onChange={(e) => setForm({ ...form, version: e.target.value })} /></div>
                                <div className="col-md-6"><label className="form-label">Core *</label><input className="form-control" value={form.core} onChange={(e) => setForm({ ...form, core: e.target.value })} /></div>
                            </div>
                            <div className="form-group mb-3 mt-3"><label className="form-label">Təsvir *</label><textarea className="form-control" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>

                            {/* Image Section */}
                            <div className="form-group mb-3">
                                <label className="form-label">Şəkil</label>
                                <div className="image-upload-container d-flex flex-column gap-2">
                                    <div className="image-placeholder position-relative" style={{ minHeight: 200 }}>
                                        {form.imageUrl ? (
                                            <img src={form.imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 12 }} />
                                        ) : (
                                            <div className="text-muted d-flex align-items-center justify-content-center" style={{ height: '100%' }}>Şəkil seçilməyib</div>
                                        )}
                                        <div className="image-actions position-absolute">
                                            <button className="action-btn delete-img" aria-label="Delete image" onClick={() => setForm({ ...form, imageUrl: '', imageFile: null })}>
                                                <img src="/assets/admin-trash.png" alt="Delete" />
                                            </button>
                                            <button className="action-btn refresh-img" aria-label="Browse image" onClick={() => document.getElementById('modal-equipment-image')?.click()}>
                                                <img src="/assets/admin-refresh.png" alt="Browse" />
                                            </button>
                                        </div>
                                    </div>
                                    <input
                                        id="modal-equipment-image"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(ev) => {
                                            const file = ev.target.files?.[0];
                                            if (file) {
                                                const imageUrl = URL.createObjectURL(file);
                                                setForm({ ...form, imageUrl, imageFile: file });
                                            }
                                        }}
                                    />

                                    <div className="image-info">*Yüklənən şəkil aaa x bbb ölçüsündə olmalıdır. Yeniləmə düyməsi şəkil seçmək üçündür.</div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={closeModal} disabled={submitting}>Ləğv et</button>
                            <button className="btn btn-primary" onClick={submitForm} disabled={submitting}>
                                {submitting ? 'Əlavə edilir...' : 'Əlavə et'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
