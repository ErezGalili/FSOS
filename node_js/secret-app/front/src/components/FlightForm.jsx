import React, { useEffect, useState } from 'react'
import flightsApi from '../utils/flightsApi'

const FlightForm = ({flightID, setError, onSuccess}) => {
    const [form, setForm] = useState({
        source: '',
        destination: '',
        passengers: '',
        price: '',
        time: ''
    })
    
    const [source, destination, passengers, price, time] = ['source', 'destination', 'passengers', 'price', 'time']
    const toDiable = [source, destination, passengers, price, time].some((key) => !form[key])
    
    useEffect(() => {
        if(!flightID) return
        flightsApi.getFlight(flightID)
            .then(flight => {
                // Format the date string for datetime-local input
                const formattedTime = flight.time ? flight.time.slice(0, 16) : '';
                setForm({...flight, time: formattedTime})
            })
            .catch(setError)
    }, [])

    const handleChange = (e) => {
        const { value, name } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (flightID) {
            flightsApi.updateFlight(flightID, form)
                .then(onSuccess)
                .catch(setError)
        } else {
            flightsApi.createFlight(form)
                .then(onSuccess)
                .catch(setError)
        }
    }

    return (
        <div className='flightForm'>
            <div>
                <label>
                    Source
                    <input type="text" name="source" value={form.source} onChange={handleChange}/>
                </label>
            </div>
            <div>
                <label>
                    Destination
                    <input type="text" name="destination" value={form.destination} onChange={handleChange}/>
                </label>
            </div>
            <div>
                <label>
                    Passengers
                    <input type="number" name="passengers" value={form.passengers} onChange={handleChange}/>
                </label>
            </div>
            <div>
                <label>
                    Price
                    <input type="number" name="price" value={form.price} onChange={handleChange}/>
                </label>
            </div>
            <div>
                <label>
                    Date
                    <input type="datetime-local" name="time" value={form.time} onChange={handleChange}/>
                </label>
            </div>
            <button className='submit' onClick={handleSubmit} disabled={toDiable}>Save</button>
        </div>
    )
}

export default FlightForm