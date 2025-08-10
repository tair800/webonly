import React, { useState } from 'react';
import footerLogo from '/assets/footer-logo.png';
import logoWhite from '/assets/logo-white.png';
import './Login.css';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const EyeIcon = () => (
        <svg
            className="eye-icon"
            fill="none"
            viewBox="0 0 24 24"
            onClick={() => setShowPassword(!showPassword)}
        >
            <path
                d="M12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9ZM12 4.5C17 4.5 21.27 7.61 23 12C21.27 16.39 17 19.5 12 19.5C7 19.5 2.73 16.39 1 12C2.73 7.61 7 4.5 12 4.5ZM3.18 12C3.98825 13.6503 5.24331 15.0407 6.80248 16.0133C8.36165 16.9858 10.1624 17.5013 12 17.5013C13.8376 17.5013 15.6383 16.9858 17.1975 16.0133C18.7567 15.0407 20.0117 13.6503 20.82 12C20.0117 10.3497 18.7567 8.95925 17.1975 7.98675C15.6383 7.01424 13.8376 6.49868 12 6.49868C10.1624 6.49868 8.36165 7.01424 6.80248 7.98675C5.24331 8.95925 3.98825 10.3497 3.18 12Z"
                fill="currentColor"
            />
        </svg>
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempt:', { email, password });
    };

    return (
        <div className="login-container">
            {/* Footer Logo - Full Page Left */}
            <img src={footerLogo} alt="Footer Logo" className="footer-logo" />

            {/* Transparent Black Center Div */}
            <div className="center-div">
                {/* Left Side - Logo Section */}
                <div className="logo-section">
                    {/* Logo container */}
                    <div className="logo-container">
                        <img src={logoWhite} alt="Logo" className="logo-image" />
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="form-section">
                    {/* Glass backdrop */}
                    <div className="glass-backdrop" />

                    <div className="form-content">
                        {/* Login Title */}
                        <h1 className="login-title">Daxil Olun</h1>

                        {/* Login Form */}
                        <form className="login-form" onSubmit={handleSubmit}>
                            {/* Email Input */}
                            <div className="form-group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Elektron poçt"
                                    className="form-input"
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div className="form-group">
                                <div className="password-container">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Şifrə"
                                        className="form-input password-input"
                                        required
                                    />
                                    <div className="eye-icon-container">
                                        <EyeIcon />
                                    </div>
                                </div>
                            </div>

                            {/* Forgot Password */}
                            <div className="forgot-password">
                                <a href="#" className="forgot-password-link">
                                    Şifrəni unutmusunuz?
                                </a>
                            </div>

                            {/* Login Button */}
                            <button type="submit" className="login-button">
                                Daxil ol
                            </button>

                            {/* Sign Up Link */}
                            <div className="signup-section">
                                <span className="signup-text">Hesabınız yoxdur? </span>
                                <a href="#" className="signup-link">
                                    Qeydiyyatdan keçin
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
