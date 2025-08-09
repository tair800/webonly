import React, { useEffect, useState } from 'react';
import './AdminAbout.css';

const API = 'http://localhost:5098/api';

export default function AdminAbout() {
    const [employees, setEmployees] = useState([]);
    const [references, setReferences] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(''); // 'employee' or 'reference'
    const [newEmployee, setNewEmployee] = useState({ name: '', position: '', phone: '', email: '', linkedin: '' });
    const [newReference, setNewReference] = useState({ name: '', imageUrl: '', alt: '' });

    const loadEmployees = async () => {
        try {
            const res = await fetch(`${API}/employees`);
            if (res.ok) setEmployees(await res.json());
        } catch { }
    };

    const loadReferences = async () => {
        try {
            const res = await fetch(`${API}/references`);
            if (res.ok) setReferences(await res.json());
        } catch { }
    };

    useEffect(() => {
        loadEmployees();
        loadReferences();
    }, []);

    const removeEmployee = async (id) => {
        if (!confirm('Silinsin?')) return;
        const res = await fetch(`${API}/employees/${id}`, { method: 'DELETE' });
        if (res.status === 204) loadEmployees();
    };

    const removeReference = async (id) => {
        if (!confirm('Silinsin?')) return;
        const res = await fetch(`${API}/references/${id}`, { method: 'DELETE' });
        if (res.status === 204) loadReferences();
    };

    const handleAddEmployee = () => { setModalType('employee'); setShowModal(true); };
    const handleAddReference = () => { setModalType('reference'); setShowModal(true); };
    const handleCloseModal = () => { setShowModal(false); setModalType(''); setNewEmployee({ name: '', position: '', phone: '', email: '', linkedin: '' }); setNewReference({ name: '', imageUrl: '', alt: '' }); };

    const handleSave = async () => {
        try {
            if (modalType === 'employee') {
                const res = await fetch(`${API}/employees`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newEmployee) });
                if (!res.ok) throw new Error('Employee save failed');
                await loadEmployees();
            } else {
                const res = await fetch(`${API}/references`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newReference) });
                if (!res.ok) throw new Error('Reference save failed');
                await loadReferences();
            }
            handleCloseModal();
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <div className="admin-about-container container-fluid">
            {/* First Section - Main Content */}
            <div className="admin-about-card p-3 mb-4">
                {/* Top Bar */}
                <div className="admin-about-topbar d-flex justify-content-between align-items-center mb-3">
                    <div className="slide-indicator">Slide 1</div>
                    <div className="top-actions d-flex gap-2">
                        <button className="add-btn btn" onClick={handleAddEmployee}>+ Əlavə et</button>
                        <button className="delete-btn btn" aria-label="Delete">
                            <img src="/assets/admin-trash.png" alt="Delete" />
                        </button>
                    </div>
                </div>

                {/* Main Content Section */}
                <div className="admin-about-content row g-3 align-items-start">
                    {/* Left Side - Text Fields */}
                    <div className="content-left col-12 col-lg-8 d-flex flex-column gap-3">
                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Heading</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Texnologiya ilə Gələcəyə Doğru"
                                    defaultValue="Texnologiya ilə Gələcəyə Doğru"
                                />
                            </div>
                        </div>

                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Subtext</label>
                            <div className="col-sm-9">
                                <textarea
                                    className="form-control"
                                    placeholder="Şirkət haqqında məlumat..."
                                    defaultValue="Softech-A şirkəti 10 illik təcrübəsi ilə ERP proqramlarının tətbiqi və avadanlıq satışı sahəsində fəaliyyət göstərir. 500-dən çox uğurlu layihə, restoranlardan istehsalat müəssisələrinə qədər geniş spektrli bizneslərin avtomatlaşdırılması və POS CLASS, POS TÜRK avadanlıqlarının rəsmi nümayəndəliyi ilə bazarda lider mövqedədir."
                                    rows={6}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Image Upload */}
                    <div className="content-right col-12 col-lg-4">
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

            {/* References - Referanslar */}
            <div className="admin-about-card p-3 mt-4">
                <div className="admin-about-topbar d-flex justify-content-between align-items-center mb-3">
                    <div className="slide-indicator">Referanslar</div>
                    <div className="references-note">*Yüklənən şəkil aaa x bbb ölçüsündə olmalıdır</div>
                </div>

                <div className="references-grid">
                    {/* Upload tile */}
                    <label className="upload-tile" onClick={handleAddReference}>
                        <div className="upload-inner">
                            <div className="upload-title">Click to upload</div>
                            <div className="upload-sub">or drag and drop</div>
                        </div>
                    </label>

                    {/* Reference items (images will be shown when fetched) */}
                    {references.map(ref => (
                        <div key={ref.id} className="reference-item">
                            <div className="reference-canvas">
                                {ref.imageUrl && <img src={ref.imageUrl} alt={ref.alt || ref.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
                            </div>
                            <div className="reference-actions">
                                <button className="action-btn delete-img" aria-label="Delete reference" onClick={() => removeReference(ref.id)}>
                                    <img src="/assets/admin-trash.png" alt="Delete" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Second Section - Team/Collective */}
            <div className="admin-about-card p-3 mt-4">
                {/* Team Section Header */}
                <div className="admin-about-topbar d-flex justify-content-between align-items-center mb-3">
                    <div className="slide-indicator">Kollektiv</div>
                    <div className="top-actions d-flex gap-2">
                        <button className="add-btn btn" onClick={handleAddEmployee}>+ Əlavə et</button>
                    </div>
                </div>

                {/* Director Section - Always Present */}
                <div className="team-member-section mb-4">

                    <div className="row g-3 align-items-start">
                        {/* Left Side - Form Fields */}
                        <div className="col-12 col-lg-8">
                            <div className="row g-3">
                                <div className="col-12">
                                    <div className="form-group row g-3 align-items-start">
                                        <label className="col-sm-3 col-form-label">Heading</label>
                                        <div className="col-sm-9">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Cavid Nəbiyev"
                                                defaultValue="Cavid Nəbiyev"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-group row g-3 align-items-start">
                                        <label className="col-sm-3 col-form-label">Job name</label>
                                        <div className="col-sm-9">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Direktor"
                                                defaultValue="Direktor"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-group row g-3 align-items-start">
                                        <label className="col-sm-3 col-form-label">Subtext</label>
                                        <div className="col-sm-9">
                                            <textarea
                                                className="form-control"
                                                placeholder="Təsvir..."
                                                defaultValue="Texnologiya sahəsində 15 ilə yaxın təcrübəyə malik olan Cavid Nəbiyev, Softech-A şirkətinin qurucusu və direktorudur. Onun rəhbərliyi ilə şirkət yüzlərlə ERP layihəsini uğurla həyata keçirmiş, həm kiçik, həm də böyük müəssisələrin rəqəmsallaşmasına töhfə vermişdir. Cavid bəyin əsas məqsədi - yerli bazarda beynəlxalq standartlara uyğun texnoloji həllər təqdim etmək və müştəri məmnuniyyətini daim ön planda tutmaqdır."
                                                rows={4}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="row g-3">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-label">Telefon</label>
                                                <input
                                                    className="form-control"
                                                    type="tel"
                                                    placeholder="0124444444"
                                                    defaultValue="0124444444"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-label">Mail</label>
                                                <input
                                                    className="form-control"
                                                    type="email"
                                                    placeholder="namesurname@mail.ru"
                                                    defaultValue="namesurname@mail.ru"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-label">Linkedin</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="0124444444"
                                                    defaultValue="0124444444"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Image Upload */}
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

                {/* Employee Sections - Dynamic */}
                {employees.map((employee) => (
                    <div key={employee.id} className="team-member-section mb-4">
                        <div className="d-flex justify-content-end mb-3">
                            <button
                                className="delete-btn btn"
                                onClick={() => removeEmployee(employee.id)}
                                aria-label="Delete employee"
                            >
                                <img src="/assets/admin-trash.png" alt="Delete" />
                            </button>
                        </div>

                        <div className="row g-3 align-items-start">
                            {/* Left Side - Form Fields */}
                            <div className="col-12 col-lg-8">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <div className="form-group row g-3 align-items-start">
                                            <label className="col-sm-3 col-form-label">Heading</label>
                                            <div className="col-sm-9">
                                                <input className="form-control" type="text" value={employee.name} readOnly />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group row g-3 align-items-start">
                                            <label className="col-sm-3 col-form-label">Job name</label>
                                            <div className="col-sm-9">
                                                <input className="form-control" type="text" value={employee.position} readOnly />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Employee/Reference Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">
                                {modalType === 'employee' ? 'Yeni İşçi Əlavə Et' : 'Yeni Referans Əlavə Et'}
                            </h3>
                            <button className="modal-close" onClick={handleCloseModal}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        <div className="modal-body">
                            {modalType === 'employee' ? (
                                <>
                                    <div className="form-group mb-3">
                                        <label className="form-label">Ad Soyad</label>
                                        <input className="form-control" placeholder="İşçi adını daxil edin" value={newEmployee.name} onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="form-label">Vəzifə</label>
                                        <input className="form-control" placeholder="İşçi vəzifəsini daxil edin" value={newEmployee.position} onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })} />
                                    </div>
                                    <div className="row g-3">
                                        <div className="col-md-4"><label className="form-label">Telefon</label><input className="form-control" value={newEmployee.phone} onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })} /></div>
                                        <div className="col-md-4"><label className="form-label">Mail</label><input className="form-control" value={newEmployee.email} onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })} /></div>
                                        <div className="col-md-4"><label className="form-label">LinkedIn</label><input className="form-control" value={newEmployee.linkedin} onChange={(e) => setNewEmployee({ ...newEmployee, linkedin: e.target.value })} /></div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="form-group mb-3"><label className="form-label">Referans Adı</label><input className="form-control" value={newReference.name} onChange={(e) => setNewReference({ ...newReference, name: e.target.value })} /></div>
                                    <div className="form-group mb-3"><label className="form-label">Şəkil URL</label><input className="form-control" value={newReference.imageUrl} onChange={(e) => setNewReference({ ...newReference, imageUrl: e.target.value })} /></div>
                                    <div className="form-group mb-3"><label className="form-label">Alt</label><input className="form-control" value={newReference.alt} onChange={(e) => setNewReference({ ...newReference, alt: e.target.value })} /></div>
                                </>
                            )}
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={handleCloseModal}>Ləğv et</button>
                            <button className="btn btn-primary" onClick={handleSave}>Əlavə et</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 