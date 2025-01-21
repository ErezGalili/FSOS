import { createContext, useContext, useState, useEffect } from 'react';
import { fetchFavorites, newFavorite, deleteFavorite, newUser, fetchUsers, deleteUser } from '../util/api.js';

export const DogsContext = createContext();

export const DogsContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [likedImages, setLikedImages] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        updateAllUsers();
    }, []);

    useEffect(() => {
        if (currentUser) {
            updateAllFavorites();
        }
    }, [currentUser]);

    const updateAllFavorites = async () => {
        try {
            if (!currentUser) {
                setLikedImages([]);
                return;
            }
            setLoading(true);
            const response = await fetchFavorites(currentUser._id);
            setLikedImages(response.data || []);
        } catch (error) {
            console.error('Error fetching favorites:', error);
            setLikedImages([]);
        } finally {
            setLoading(false);
        }
    };

    const addToFavorites = async (imageSrc) => {
        try {
            if (!currentUser) return;
            const response = await newFavorite(currentUser._id, imageSrc);
            if (response.success) {
                await updateAllFavorites();
            }
        } catch (error) {
            console.error('Error adding favorite:', error);
        }
    };

    const removeFromFavorites = async (favoriteId) => {
        try {
            await deleteFavorite(currentUser._id, favoriteId);
            await updateAllFavorites();
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    const updateAllUsers = async () => {
        try {
            setLoading(true);
            const response = await fetchUsers();
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const addUser = async (name) => {
        try {
            await newUser(name);
            await updateAllUsers();
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const removeUser = async (id) => {
        try {
            await deleteUser(id);
            if (currentUser?._id === id) {
                setCurrentUser(null);
            }
            await updateAllUsers();
        } catch (error) {
            console.error('Error removing user:', error);
        }
    };

    return (
        <DogsContext.Provider value={{
            currentUser,
            setCurrentUser,
            likedImages,
            loading,
            users,
            addUser,
            removeUser,
            addToFavorites,
            removeFromFavorites,
            updateAllFavorites
        }}>
            {children}
        </DogsContext.Provider>
    );
};

export const useDogsContext = () => {
    const context = useContext(DogsContext);
    if (!context) {
        throw new Error('useDogsContext must be used within a DogsContextProvider');
    }
    return context;
};
