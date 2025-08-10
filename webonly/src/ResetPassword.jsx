import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import logoIcon from '/assets/logo-icon.png';
import logoText from '/assets/logo-text.png';
import './ResetPassword.css';

function ResetPassword() {
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');
    const [isValidToken, setIsValidToken] = useState(false);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        // Get token from URL query parameter
        const tokenFromUrl = searchParams.get('token');
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
            setIsValidToken(true);
        } else {
            setError('Şifrə bərpa linki düzgün deyil');
            setIsValidToken(false);
        }
    }, [searchParams]);

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

        if (!formData.newPassword) {
            newErrors.newPassword = 'Yeni şifrə tələb olunur';
        } else if (formData.newPassword.length < 6) {
            newErrors.newPassword = 'Şifrə ən azı 6 simvol olmalıdır';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Şifrəni təsdiqləyin';
        } else if (formData.newPassword !== formData.confirmPassword) {
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
        setError('');
        setMessage('');

        try {
            const response = await fetch('http://localhost:5098/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    newPassword: formData.newPassword,
                    confirmPassword: formData.confirmPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setFormData({ newPassword: '', confirmPassword: '' });
                // Redirect to login after 3 seconds
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setError(data.message || 'Şifrə bərpası uğursuz oldu');
            }
        } catch (error) {
            setError('Şəbəkə xətası. Yenidən cəhd edin.');
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = (field) => {
        if (field === 'newPassword') {
            setShowPassword(!showPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    if (!isValidToken) {
        return (
            <div className="reset-password-container">
                <div className="reset-password-content">
                    <div className="reset-password-logo-section">
                        <img src={logoIcon} alt="Logo Icon" className="reset-password-logo-icon" />
                        <img src={logoText} alt="Logo Text" className="reset-password-logo-text" />
                    </div>

                    <div className="reset-password-form-section">
                        <div className="reset-password-form-container">
                            <div className="error-message general-error">
                                {error}
                            </div>
                            <div className="reset-password-footer">
                                <Link to="/forgot-password" className="forgot-password-link">
                                    Şifrə bərpa linkini yenidən göndərin
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="reset-password-container">
            {/* Background Elements */}
            <div className="reset-password-circle-background-left"></div>
            <div className="reset-password-circle-background-right"></div>

            <div className="reset-password-content">
                <div className="reset-password-logo-section">
                    <img src={logoIcon} alt="Logo Icon" className="reset-password-logo-icon" />
                    <img src={logoText} alt="Logo Text" className="reset-password-logo-text" />
                </div>

                <div className="reset-password-form-section">
                    <div className="reset-password-form-container">
                        <h2 className="reset-password-heading">Yeni Şifrə Təyin Et</h2>
                        <p className="reset-password-subtitle">
                            Yeni şifrənizi daxil edin
                        </p>

                        {message && (
                            <div className="success-message">
                                {message}
                                <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                                    Giriş səhifəsinə yönləndirilirsiniz...
                                </p>
                            </div>
                        )}

                        {error && (
                            <div className="error-message general-error">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="reset-password-form">
                            <div className="form-group">
                                <label htmlFor="newPassword" className="form-label">
                                    Yeni Şifrə <span className="required">*</span>
                                </label>
                                <div className="password-input-container">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="newPassword"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleInputChange}
                                        className={`form-input password-input ${errors.newPassword ? 'error' : ''}`}
                                        placeholder="Yeni şifrənizi daxil edin"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle-btn"
                                        onClick={() => togglePasswordVisibility('newPassword')}
                                        disabled={isLoading}
                                    >
                                        {showPassword ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                                {errors.newPassword && (
                                    <span className="error-text">{errors.newPassword}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword" className="form-label">
                                    Şifrəni Təsdiqləyin <span className="required">*</span>
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
                                {isLoading ? 'Şifrə Təyin Edilir...' : 'Şifrəni Təyin Et'}
                            </button>
                        </form>

                        <div className="reset-password-footer">
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

export default ResetPassword;
