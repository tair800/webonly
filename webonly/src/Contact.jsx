import React, { useState } from 'react';
import './Contact.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="contact-container">
            {/* Circle Background Elements */}
            <div className="contact-circle-background-left"></div>
            <div className="contact-circle-background-right"></div>

            <div className="contact-center">
                <div className="contact-logo">
                    <img src="/assets/logo-white.png" alt="Logo" />
                </div>
                <div className="contact-text">
                    <p>Bizimlə əlaqə</p>
                </div>
                <div className="contact-rainbow">
                    <img src="/assets/rainbow.png" alt="Rainbow" />
                </div>
            </div>

            <div className="contact-main-section">
                <div className="contact-left-section">
                    <div className="contact-content">
                        <div className="contact-heading">
                            <h1 className="heading-line-1">Sualınız var?</h1>
                            <h1 className="heading-line-2">Həllini bilirik</h1>
                        </div>

                        <div className="contact-description">
                            <p>
                                Texnoloji tərəfdaşınız olaraq suallarınızı, fikirlərinizi və əməkdaşlıq təkliflərinizi dəyərli sayırıq.
                                Bizimlə əlaqə saxlamaq bir klik uzağınızdadır.
                            </p>
                        </div>

                        <div className="contact-location">
                            <span>Bakı, Azərbaycan</span>
                        </div>

                        <div className="contact-info">
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <img src="/assets/phone-icon.png" alt="Phone" />
                                </div>
                                <span>+994 xx xxx xx xx</span>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <img src="/assets/phone-icon.png" alt="Phone" />
                                </div>
                                <span>+994 xx xxx xx xx</span>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <img src="/assets/email-icon.png" alt="Email" />
                                </div>
                                <span>example@mail.az</span>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <img src="/assets/location-icon.png" alt="Location" />
                                </div>
                                <span>Baku</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact-right-section">
                    <div className="contact-form-container">
                        <h2>Sənin məlumatların</h2>
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Adınız <span className="required">*</span></label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Sənin adın"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Elektron poçt <span className="required">*</span></label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Sənin elektron poçtun"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Mövzu <span className="required">*</span></label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    placeholder="Mesajın mövzusu"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Şərh / Sual <span className="required">*</span></label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Mesajın"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="submit-btn">
                                Göndər
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="contact-map">
                <img src="/assets/map.png" alt="Map" />
            </div>
        </div>
    );
}

export default Contact;

