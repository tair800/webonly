import React, { useState } from 'react';
import './TestPage.css';

function Test() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempt:', { email, password });
    };

    return (
        <div className="test-page-container">
            <div className="test-page-footer-left">
                <img src="/assets/footer-login.png" alt="Admin Footer" />
            </div>

            <div className="test-page-centered-div">
                <div className="test-page-left-side transparent">
                    <div className="test-page-logo-top-left">
                        <img src="/assets/logo-white.png" alt="Logo" />
                    </div>
                    <div className="test-page-circle-background-left"></div>
                </div>
                <div className="test-page-right-side black">
                    <form className="test-page-login-form" onSubmit={handleLogin}>
                        <h1 className="test-page-login-title">DAXİL OLUN</h1>

                        <div className="test-page-input-group">
                            <input
                                type="email"
                                className="test-page-input-field"
                                placeholder="Elektron poçt"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="test-page-input-group">
                            <div className="test-page-password-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="test-page-input-field"
                                    placeholder="Şifrə"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="test-page-password-toggle"
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



                        <button type="submit" className="test-page-login-button">
                            Daxil ol
                        </button>

                        <div className="test-page-register-link">
                            Hesabınız yoxdur? <a href="#register">Qeydiyyatdan keçin</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Test; 