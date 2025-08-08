import React from 'react';
import './AdminEquipment.css';
import './AdminAbout.css';

export default function AdminEquipment() {
    return (
        <div className="admin-equipment-container admin-about-container container-fluid">
            <div className="admin-equipment-header d-flex justify-content-between align-items-center mb-3 pt-3" style={{ padding: '0 15px' }}>
                <h2 className="m-0">Avadanlıqlar</h2>
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
                    <button className="add-btn btn d-flex align-items-center gap-2">
                        <span style={{ fontSize: '16px' }}>+</span>
                        Əlavə et
                    </button>
                </div>
            </div>

            {/* Equipment Content */}
            <div className="admin-about-card p-3 mb-4">
                <div className="row g-3 align-items-start">
                    <div className="col-12 col-lg-8 d-flex flex-column gap-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="text-white m-0">Slide 1</h5>
                        </div>
                        {/* Slide 1 Section */}
                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Name</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="PosClass TX-1500S"
                                    defaultValue="PosClass TX-1500S"
                                />
                            </div>
                        </div>

                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Features</label>
                            <div className="col-sm-9">
                                <textarea
                                    className="form-control"
                                    rows={4}
                                    placeholder="Türkiyə İstehsalı Keyfiyyət&#10;1 İl Rəsmi Zəmanət&#10;Wi-Fi Adapter Artırma İmkanı&#10;10.1&quot; Arxa Ekran Əlavə İmkanı"
                                    defaultValue="Türkiyə İstehsalı Keyfiyyət&#10;1 İl Rəsmi Zəmanət&#10;Wi-Fi Adapter Artırma İmkanı&#10;10.1&quot; Arxa Ekran Əlavə İmkanı"
                                />
                            </div>
                        </div>

                        {/* J-1900 Section */}
                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Title</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="J-1900"
                                    defaultValue="J-1900"
                                />
                            </div>
                        </div>

                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Ekran ölçüsü</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="15 inch LED LCD proyeksiyalı Kapasitiv panel"
                                    defaultValue="15 inch LED LCD proyeksiyalı Kapasitiv panel"
                                />
                            </div>
                        </div>

                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Multi-Touch Sensor Ekran</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="10 barmaq"
                                    defaultValue="10 barmaq"
                                />
                            </div>
                        </div>

                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Prosessor</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Intel BayTrail J1900 2.0 GHZ"
                                    defaultValue="Intel BayTrail J1900 2.0 GHZ"
                                />
                            </div>
                        </div>

                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Yaddaş RAM</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="4GB DDR3 SODIMM - 8GB (1333/1666 MHz)"
                                    defaultValue="4GB DDR3 SODIMM - 8GB (1333/1666 MHz)"
                                />
                            </div>
                        </div>

                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Flash Disk</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="120GB SSD HDD 2.5&quot; /MSATA - 240GB SSD artırma imkanı"
                                    defaultValue="120GB SSD HDD 2.5&quot; /MSATA - 240GB SSD artırma imkanı"
                                />
                            </div>
                        </div>

                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Uyğun əməliyyat sistemi</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Microsoft Windows 7, Windows 8.1, Windows 10, Windows 11, Posready 7"
                                    defaultValue="Microsoft Windows 7, Windows 8.1, Windows 10, Windows 11, Posready 7"
                                />
                            </div>
                        </div>

                        {/* Intel Core i5 Section */}
                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Title</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Intel Core i5"
                                    defaultValue="Intel Core i5"
                                />
                            </div>
                        </div>

                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Ekran ölçüsü</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="15 inch LED LCD proyeksiyalı Kapasitiv panel"
                                    defaultValue="15 inch LED LCD proyeksiyalı Kapasitiv panel"
                                />
                            </div>
                        </div>

                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Multi-Touch Sensor Ekran</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="10 barmaq"
                                    defaultValue="10 barmaq"
                                />
                            </div>
                        </div>

                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Prosessor</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Intel Celeron/Pentium/CoreTM i3/i5/i7"
                                    defaultValue="Intel Celeron/Pentium/CoreTM i3/i5/i7"
                                />
                            </div>
                        </div>

                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Yaddaş RAM</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="4GB DDR3 SODIMM - 8GB (1333/1666 MHz)"
                                    defaultValue="4GB DDR3 SODIMM - 8GB (1333/1666 MHz)"
                                />
                            </div>
                        </div>

                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Flash Disk</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="120GB SSD HDD 2.5&quot; /MSATA - 240GB SSD artırma imkanı"
                                    defaultValue="120GB SSD HDD 2.5&quot; /MSATA - 240GB SSD artırma imkanı"
                                />
                            </div>
                        </div>

                        <div className="form-group row g-3 align-items-start">
                            <label className="col-sm-3 col-form-label">Uyğun əməliyyat sistemi</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Microsoft Windows 7, Windows 8.1, Windows 10, Windows 11, Posready 7"
                                    defaultValue="Microsoft Windows 7, Windows 8.1, Windows 10, Windows 11, Posready 7"
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
        </div>
    );
}
