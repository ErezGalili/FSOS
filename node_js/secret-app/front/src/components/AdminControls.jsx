import React, { useState } from 'react';
import FlightForm from './FlightForm';

const AdminControls = ({ onFlightAdded }) => {
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState(null);

    const handleSuccess = () => {
        setShowForm(false);
        setError(null);
        if (onFlightAdded) onFlightAdded();
    };

    return (
        <div className="admin-controls">
            {!showForm ? (
                <button 
                    className="add-button"
                    onClick={() => setShowForm(true)}
                >
                    Add New Flight
                </button>
            ) : (
                <>
                    {error && <div className="error">{error}</div>}
                    <FlightForm 
                        setError={setError}
                        onSuccess={handleSuccess}
                    />
                    <button 
                        className="cancel-button"
                        onClick={() => setShowForm(false)}
                    >
                        Cancel
                    </button>
                </>
            )}
        </div>
    );
};

export default AdminControls;
