import React, { useState, useEffect } from 'react'

const FlightRow = (props) => {
    const { source, destination, passengers, price, date } = props
    return (
        <tr>
            <td>{source}</td>
            <td>{destination}</td>
            <td>{passengers}</td>
            <td>{price}USD</td>
            <td>{date}</td>
        </tr>
    )
}

const Flighttable = (props) => {
    const { flights } = props
    return (
        <table>
            <thead>
                <tr>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Passengers</th>
                    <th>Price</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {flights.length ? flights.map((flight) => <FlightRow key={flight._id} {...flight} />): <tr><td className='tableError' colSpan='5'>No flights available</td></tr>}
            </tbody>
        </table>
    )
}

const FlightPage = () => {
    const [flights, setFlights] = useState([])
    const [error, setError] = useState('')
    useEffect(() => {
        fetch('http://localhost:3000/flights')
            .then(res => res.json())
            .then(data => setFlights(data))
    }, [])
    return (
        <div>
            <span className='error'>{error && <p>{error}</p>}</span>
            <Flighttable flights={flights} />
        </div>
    )
}

export default FlightPage