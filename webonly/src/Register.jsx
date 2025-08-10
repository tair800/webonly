import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoIcon from '/assets/logo-icon.png';
import logoText from '/assets/logo-text.png';
import './Register.css';

function Register() {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email tələb olunur';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Düzgün email formatı daxil edin';
        }

        if (!formData.username.trim()) {
            newErrors.username = 'İstifadəçi adı tələb olunur';
        } else if (formData.username.length < 3) {
            newErrors.username = 'İstifadəçi adı ən azı 3 simvol olmalıdır';
        }

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'Ad tələb olunur';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Soyad tələb olunur';
        }

        if (!formData.password) {
            newErrors.password = 'Şifrə tələb olunur';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Şifrə ən azı 6 simvol olmalıdır';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Şifrəni təsdiqləyin';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Şifrələr uyğun gəlmir';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5098/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    username: formData.username,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    firstName: formData.firstName,
                    lastName: formData.lastName
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Registration successful, redirect to login
                navigate('/login', {
                    state: {
                        message: 'Qeydiyyat uğurla tamamlandı! İndi giriş edə bilərsiniz.'
                    }
                });
            } else {
                setErrors({ general: data.message || 'Qeydiyyat uğursuz oldu' });
            }
        } catch (error) {
            setErrors({ general: 'Şəbəkə xətası. Yenidən cəhd edin.' });
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    return (
        <div className="register-container">
            {/* Background Elements */}
            <div className="register-circle-background-left"></div>
            <div className="register-circle-background-right"></div>

            <div className="register-content">
                <div className="register-logo-section">
                    <img src={logoIcon} alt="Logo Icon" className="register-logo-icon" />
                    <img src={logoText} alt="Logo Text" className="register-logo-text" />
                </div>

                <div className="register-form-section">
                    <div className="register-form-container">
                        <h2 className="register-heading">Qeydiyyat</h2>
                        <p className="register-subtitle">Yeni hesab yaradın</p>

                        {errors.general && (
                            <div className="error-message general-error">
                                {errors.general}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="register-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="firstName" className="form-label">
                                        Ad <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={`form-input ${errors.firstName ? 'error' : ''}`}
                                        placeholder="Adınızı daxil edin"
                                        disabled={isLoading}
                                    />
                                    {errors.firstName && (
                                        <span className="error-text">{errors.firstName}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastName" className="form-label">
                                        Soyad <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={`form-input ${errors.lastName ? 'error' : ''}`}
                                        placeholder="Soyadınızı daxil edin"
                                        disabled={isLoading}
                                    />
                                    {errors.lastName && (
                                        <span className="error-text">{errors.lastName}</span>
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email <span className="required">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`form-input ${errors.email ? 'error' : ''}`}
                                    placeholder="Email ünvanınızı daxil edin"
                                    disabled={isLoading}
                                />
                                {errors.email && (
                                    <span className="error-text">{errors.email}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="username" className="form-label">
                                    İstifadəçi adı <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className={`form-input ${errors.username ? 'error' : ''}`}
                                    placeholder="İstifadəçi adınızı daxil edin"
                                    disabled={isLoading}
                                />
                                {errors.username && (
                                    <span className="error-text">{errors.username}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="form-label">
                                    Şifrə <span className="required">*</span>
                                </label>
                                <div className="password-input-container">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className={`form-input password-input ${errors.password ? 'error' : ''}`}
                                        placeholder="Şifrənizi daxil edin"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle-btn"
                                        onClick={() => togglePasswordVisibility('password')}
                                        disabled={isLoading}
                                    >
                                        {showPassword ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                                {errors.password && (
                                    <span className="error-text">{errors.password}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword" className="form-label">
                                    Şifrəni təsdiqləyin <span className="required">*</span>
                                </label>
                                <div className="password-input-container">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className={`form-input password-input ${errors.confirmPassword ? 'error' : ''}`}
                                        placeholder="Şifrənizi yenidən daxil edin"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle-btn"
                                        onClick={() => togglePasswordVisibility('confirmPassword')}
                                        disabled={isLoading}
                                    >
                                        {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <span className="error-text">{errors.confirmPassword}</span>
                                )}
                            </div>

                            <button
                                type="submit"
                                className={`submit-btn ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Qeydiyyat edilir...' : 'Qeydiyyatdan keç'}
                            </button>
                        </form>

                        <div className="register-footer">
                            <p className="have-account">
                                Artıq hesabınız var?{' '}
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

export default Register;
