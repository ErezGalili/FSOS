const BASE_URL = 'http://localhost:3000/users';

const login = async (credentials) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }
        
        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        return data.data;
    } catch (error) {
        throw new Error(error.message || 'Login failed');
    }
};

const register = async (userData) => {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Registration failed');
        }
        
        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        return data.data;
    } catch (error) {
        throw new Error(error.message || 'Registration failed');
    }
};

const getUsers = async () => {
    const response = await fetch(`${BASE_URL}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
};

const switchToUser = async (userId) => {
    const response = await fetch(`${BASE_URL}/switch/${userId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
};

const promoteUser = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/${userId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to promote user');
        }

        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        return data.data;
    } catch (error) {
        throw new Error(error.message || 'Failed to promote user');
    }
};

export { login, register, getUsers, switchToUser, promoteUser };
