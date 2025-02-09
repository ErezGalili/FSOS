const BASE_URL = 'http://localhost:3000/users';

const APICall = async (url, method, body) => {
    method = method || 'GET';
    const options = { method, headers: {} };
    if (body) {
        options.body = JSON.stringify(body);
        options.headers['Content-Type'] = 'application/json';
    }

    return fetch(`${BASE_URL}${url}`, options)
        .then(res => res.json())
        .then(obj => {
            if (!obj.success) {
                throw new Error(obj.error);
            }
            return obj.data;
        })
}

const getUsers = () => APICall('/', 'GET');

const getUser = (id) => APICall(`/${id}`, 'GET');

const createUser = (user) => APICall('/', 'POST', user);

const switchToUser = (userId) => APICall(`/switch/${userId}`, 'POST');

const updateUser = (id, user) => APICall(`/${id}`, 'PATCH', user);

const deleteUser = (id) => APICall(`/${id}`, 'DELETE');

export { getUsers, getUser, createUser, updateUser, deleteUser };