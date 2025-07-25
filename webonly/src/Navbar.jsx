import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoIcon from './assets/logo-icon.png';
import logoText from './assets/logo-text.png';
import globeImg from './assets/globe.png';
import dropdownIcon from './assets/dropdown-icon.png';

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const langRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (langRef.current && !langRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo-frame">
                    <img
                        src={logoIcon}
                        alt="Logo Icon"
                        className="logo-icon"
                        width="92"
                        height="75"
                    />
                    <img
                        src={logoText}
                        alt="Logo Text"
                        className="logo-text"
                        width="144"
                        height="27"
                    />
                </div>
                <ul className="navbar-links">
                    <li><a href="#">Əsas Səhifə</a></li>
                    <li><Link to="/about-us" className="active">Haqqımızda</Link></li>
                    <li><a href="#">Məhsullar</a></li>
                    <li><a href="#">Xidmətlər</a></li>
                    <li><a href="#">Avadanlıqlar</a></li>
                    <li><a href="#">Bloq</a></li>
                    <li><a href="#">Əlaqə</a></li>
                </ul>
                <div
                    className="navbar-lang"
                    ref={langRef}
                    tabIndex={0}
                    onClick={() => setDropdownOpen((open) => !open)}
                >
                    <img
                        src={globeImg}
                        alt="Language Globe"
                        className="lang-globe"
                        width="19.25"
                        height="19.25"
                    />
                    <img
                        src={dropdownIcon}
                        alt="Dropdown Icon"
                        className="dropdown-icon"
                        width="21"
                        height="21"
                    />
                    {dropdownOpen && (
                        <div className="lang-dropdown">
                            <div className="lang-option">az</div>
                            <div className="lang-option">eng</div>
                            <div className="lang-option">rus</div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar; 