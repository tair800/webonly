import React from 'react';
import './TestPage.css';

function Test() {
    return (
        <div className="test-container">
            <div className="test-footer-left">
                <img src="/assets/footer-login.png" alt="Admin Footer" />
            </div>

            <div className="centered-div">
                <div className="left-side transparent">
                    <div className="circle-background-left"></div>
                </div>
                <div className="right-side black"></div>
            </div>
        </div>
    );
}

export default Test; 