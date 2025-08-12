import React, { useState, useEffect } from 'react';
import EquipmentCard from './components/EquipmentCard';
import './TestPage.css';

function Test() {
    const [testEquipment, setTestEquipment] = useState(null);

    useEffect(() => {
        // Fetch one equipment item for testing
        const fetchTestEquipment = async () => {
            try {
                const res = await fetch('http://localhost:5098/api/equipment/full');
                if (!res.ok) throw new Error('Failed to load equipment');
                const data = await res.json();
                // Use the first equipment item for testing
                setTestEquipment(data[0]);
            } catch (e) {
                console.error(e);
            }
        };
        fetchTestEquipment();
    }, []);

    const handleEquipmentCardClick = (equipmentId) => {
        // Add your test logic here
    };

    if (!testEquipment) {
        return (
            <div className="test-container">
                <div className="loading">Loading test equipment...</div>
            </div>
        );
    }

    return (
        <div className="test-container">
            <h1>Equipment Card Test Page</h1>
            <p>This is a test page for experimenting with equipment cards</p>

            <div className="test-card-section">
                <h2>Test Equipment Card:</h2>
                <div className="test-card-wrapper">
                    <EquipmentCard
                        equipment={testEquipment}
                        onMoreClick={handleEquipmentCardClick}
                    />
                </div>
            </div>


        </div>
    );
}

export default Test; 