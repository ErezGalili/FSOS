import React, { useState, useEffect } from 'react'
import flightsApi from '../utils/flightsApi'
import FlightForm from './FlightForm'

const FlightRow = (props) => {
    const { _id, source, destination, passengers, price, time, onEdit, onDelete } = props
    // Convert UTC to local time for display
    const localTime = new Date(time).toLocaleString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    return (
        <tr className="flightRow">
            <td>{source}</td> 
            <td>{destination}</td>
            <td>{passengers}</td>
            <td>{price}$</td>
            <td>{localTime}</td>
            <td><button onClick={() => onEdit(_id)}>Edit</button></td>
            <td><button onClick={() => onDelete(_id)}>Delete</button></td>
        </tr>
    )
}

const Flighttable = (props) => {
    const { flights, setFlights, setError, onSuccess } = props
    const [editID, setEditID] = useState()
    
    const handleDelete = (id) => {
        flightsApi.deleteFlight(id)
            .then(() => {
                setFlights(flights.filter(flight => flight._id !== id))
            })
            .catch(error => console.error('Delete failed:', error))
    }

    const onEditSuccess = () => {
        flightsApi.getFlights()
            .then(setFlights)
            .then(onSuccess)
            .catch(setError)
        setEditID(null)
    }

    const handleEdit = (id) => {
        setEditID(id);
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Passengers</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {flights.length ? flights.map((flight) => (
                    <React.Fragment key={flight._id}>
                        <FlightRow {...flight} onEdit={handleEdit} onDelete={handleDelete} />
                        {editID === flight._id && (
                            <tr>
                                <td colSpan="7">
                                    <FlightForm flightID={editID} onSuccess={onEditSuccess} setError={setError} />
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                )) : (<tr><td className="tableError" colSpan="7">No flights available</td></tr>)}
            </tbody>
        </table>
    )
}

const FlightPage = () => {
    const [flights, setFlights] = useState([])
    const [error, setError] = useState('')
    const [showAddForm, setShowAddForm] = useState(false)

    useEffect(() => {
        flightsApi.getFlights()
            .then(setFlights)
            .catch(setError)
    }, [])

    const handleAddSuccess = () => {
        flightsApi.getFlights()
            .then(setFlights)
            .catch(setError)
        setShowAddForm(false)
    }

    return (
        <div className="flight-container">
            <span className='error'>{error && <p>{error}</p>}</span>
            <Flighttable flights={flights} setFlights={setFlights} setError={setError} onSuccess={() => setError('')} />
            <div className="add-flight-section">
                <button className="add-button" onClick={() => setShowAddForm(!showAddForm)}>
                    {showAddForm ? 'Cancel' : 'Add Flight'}
                </button>
                {showAddForm && <FlightForm onSuccess={handleAddSuccess} setError={setError} />}
            </div>
        </div>
    )
}

export default FlightPage