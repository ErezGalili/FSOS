const BASE_URL = 'http://127.0.0.1:3000/flights';
const APICall = async (url, method, body) => {
    method = method || 'GET';
    const options = { method, headers: {} };
    if (body) {
        options.body = JSON.stringify(body);
        options.headers['Content-Type'] = 'application/json';
    }

    return fetch(`${BASE_URL}${url}`, options)
        .then(res=>res.json())
        .then(obj=>{
            if (!obj.success){
                throw new Error(obj.error);
            }
            return obj.data;
        })
}

const getFlights = () => APICall('/', 'GET');
const getFlight = (id) => APICall(`/${id}`, 'GET');
const createFlight = (flight) => APICall('/', 'POST', flight);
const updateFlight = (id, flight) => APICall(`/${id}`, 'PATCH', flight);
const deleteFlight = (id) => APICall(`/${id}`, 'DELETE');

export default { getFlights, getFlight, createFlight, updateFlight, deleteFlight };