const BASE_URL = 'http://127.0.0.1:3000/flight';

const APICall = async (url, method, body) => {
    method = method || 'GET';
    const options = { 
        method, 
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        } 
    };
    
    if (body) {
        options.body = JSON.stringify(body);
        options.headers['Content-Type'] = 'application/json';
    }

    return fetch(`${BASE_URL}${url}`, options)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(obj => {
            if (!obj.success) {
                throw new Error(obj.message);
            }
            return obj.data;
        });
}

const getFlights = () => APICall('/', 'GET');
const getFlight = (id) => APICall(`/${id}`, 'GET');
const createFlight = (flight) => APICall('/', 'POST', flight);
const updateFlight = (id, flight) => APICall(`/${id}`, 'PATCH', flight);
const deleteFlight = (id) => APICall(`/${id}`, 'DELETE');

export default { getFlights, getFlight, createFlight, updateFlight, deleteFlight };