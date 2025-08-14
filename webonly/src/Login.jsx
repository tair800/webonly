import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5098/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('adminToken', data.token);
                localStorage.setItem('adminUser', JSON.stringify(data.user));
                if (data.expiresAt) {
                    localStorage.setItem('tokenExpiresAt', data.expiresAt);
                }
                navigate('/admin-panel', { replace: true });
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-footer-left">
                <img src="/assets/footer-login.png" alt="Admin Footer" />
            </div>

            <div className="login-centered-div">
                <div className="login-left-side transparent">
                    <div className="login-logo-top-left">
                        <img src="/assets/logo-white.png" alt="Logo" />
                    </div>
                    <div className="login-circle-background-left"></div>
                </div>
                <div className="login-right-side black">
                    <form className="login-form" onSubmit={handleSubmit}>
                        {error && (
                            <div className="login-error-message">
                                {error}
                            </div>
                        )}

                        <h1 className="login-title">DAXİL OLUN</h1>

                        <div className="login-input-group">
                            <input
                                type="text"
                                name="username"
                                className="login-input-field"
                                placeholder="İstifadəçi adı"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="login-input-group">
                            <div className="login-password-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="login-input-field"
                                    placeholder="Şifrə"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="login-password-toggle"
                                    onClick={togglePasswordVisibility}
                                >
                                    <img
                                        src="/assets/eye-icon.png"
                                        alt={showPassword ? "Hide password" : "Show password"}
                                        style={{ width: '20px', height: '20px' }}
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="login-checkbox-group">
                            <label className="login-checkbox-label">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                />
                                Məni xatırla
                            </label>
                        </div>

                        <button type="submit" className="login-button" disabled={loading}>
                            {loading ? 'Daxil olunur...' : 'Daxil ol'}
                        </button>

                      
                    </form>
                </div>
            </div>
        </div>
    );
}
