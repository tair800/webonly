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
            <div className="contact-center">
                <div className="contact-logo">
                    <img src="/src/assets/logo-white.png" alt="Logo" />
                </div>
                <div className="contact-text">
                    <p>Bizimlə əlaqə</p>
                </div>
                <div className="contact-rainbow">
                    <img src="/src/assets/rainbow.png" alt="Rainbow" />
                </div>
            </div>

            <div className="contact-form-section">
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
    );
}

export default Contact;
