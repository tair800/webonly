import React, { useState } from 'react';
import './Test.css';

function Test() {
    const [testState, setTestState] = useState('Hello from Test Component!');

    const handleClick = () => {
        setTestState('Button clicked! ' + new Date().toLocaleTimeString());
    };

    return (
        <div className="test-container">
            <div className="test-header">
                <h1>Test Component</h1>
                <p>Use this for experiments and testing</p>
            </div>

            <div className="test-content">
                <div className="test-card">
                    <h2>Interactive Test</h2>
                    <p>{testState}</p>
                    <button className="test-button" onClick={handleClick}>
                        Click Me!
                    </button>
                </div>

                <div className="test-card">
                    <h2>Sample Elements</h2>
                    <div className="test-grid">
                        <div className="test-item">Item 1</div>
                        <div className="test-item">Item 2</div>
                        <div className="test-item">Item 3</div>
                        <div className="test-item">Item 4</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Test; 