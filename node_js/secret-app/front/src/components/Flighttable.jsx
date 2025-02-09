import React, { useState, useEffect } from 'react';
import flightsApi from '../utils/flightsApi';
import AdminControls from './AdminControls';
import FlightForm from './FlightForm';

function Flighttable() {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [isAdmin, setIsAdmin] = useState(false);
    const [editingFlight, setEditingFlight] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            const user = JSON.parse(userData);
            setIsAdmin(user.isAdmin);
        }
    }, []);

    const fetchFlights = () => {
        if (!isAuthenticated) {
            setError('Please login to view flights');
            setLoading(false);
            return;
        }

        flightsApi.getFlights()
            .then(data => {
                setFlights(data);
                setLoading(false);
            })
            .catch(err => {
                if (err.message.includes('401')) {
                    setError('Please login to view flights');
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                } else {
                    setError('Error fetching flights');
                }
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchFlights();
    }, [isAuthenticated]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this flight?')) {
            try {
                await flightsApi.deleteFlight(id);
                fetchFlights();
            } catch (err) {
                setError(err.message);
            }
        }
    };

    if (loading) return <p>Loading flights...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!isAuthenticated) return <p>Please login to view flights</p>;

    return (
        <div className="flight-container">
            <table>
                <thead>
                    <tr>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>Passengers</th>
                        <th>Price</th>
                        <th>Time</th>
                        {isAdmin && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {flights.map(flight => (
                        editingFlight === flight._id ? (
                            <tr key={flight._id} className="editing-row">
                                <td colSpan={isAdmin ? 6 : 5}>
                                    <div className="inline-edit-form">
                                        <FlightForm
                                            flightID={flight._id}
                                            setError={setError}
                                            onSuccess={() => {
                                                setEditingFlight(null);
                                                fetchFlights();
                                            }}
                                        />
                                        <button
                                            className="cancel-button"
                                            onClick={() => setEditingFlight(null)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            <tr key={flight._id}>
                                <td>{flight.source}</td>
                                <td>{flight.destination}</td>
                                <td>{flight.passengers}</td>
                                <td>{flight.price}</td>
                                <td>{new Date(flight.time).toLocaleString()}</td>
                                {isAdmin && (
                                    <td className="action-buttons">
                                        <button 
                                            className="edit-button" 
                                            onClick={() => setEditingFlight(flight._id)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="delete-button" 
                                            onClick={() => handleDelete(flight._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                )}
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
            {isAdmin && <AdminControls onFlightAdded={fetchFlights} />}
        </div>
    );
}

export default Flighttable;