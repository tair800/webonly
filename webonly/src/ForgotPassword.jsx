import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoIcon from '/assets/logo-icon.png';
import logoText from '/assets/logo-text.png';
import './ForgotPassword.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setError('Email tələb olunur');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Düzgün email formatı daxil edin');
            return;
        }

        setIsLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await fetch('http://localhost:5098/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.trim() })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setEmail('');
            } else {
                setError(data.message || 'Xəta baş verdi. Yenidən cəhd edin.');
            }
        } catch (error) {
            setError('Şəbəkə xətası. Yenidən cəhd edin.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            {/* Background Elements */}
            <div className="forgot-password-circle-background-left"></div>
            <div className="forgot-password-circle-background-right"></div>

            <div className="forgot-password-content">
                <div className="forgot-password-logo-section">
                    <img src={logoIcon} alt="Logo Icon" className="forgot-password-logo-icon" />
                    <img src={logoText} alt="Logo Text" className="forgot-password-logo-text" />
                </div>

                <div className="forgot-password-form-section">
                    <div className="forgot-password-form-container">
                        <h2 className="forgot-password-heading">Şifrəni Bərpa Et</h2>
                        <p className="forgot-password-subtitle">
                            Şifrənizi unutmusunuzsa, email ünvanınızı daxil edin
                        </p>

                        {message && (
                            <div className="success-message">
                                {message}
                            </div>
                        )}

                        {error && (
                            <div className="error-message general-error">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="forgot-password-form">
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email <span className="required">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`form-input ${error ? 'error' : ''}`}
                                    placeholder="Email ünvanınızı daxil edin"
                                    disabled={isLoading}
                                />
                            </div>

                            <button
                                type="submit"
                                className={`submit-btn ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Göndərilir...' : 'Şifrə Bərpa Linkini Göndər'}
                            </button>
                        </form>

                        <div className="forgot-password-footer">
                            <p className="remember-password">
                                Şifrənizi xatırlayırsınız?{' '}
                                <Link to="/login" className="login-link">
                                    Giriş edin
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
