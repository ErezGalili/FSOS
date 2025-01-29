import { createContext, useContext, useState, useEffect } from 'react';
import { fetchFavorites, newFavorite, deleteFavorite, newUser, fetchUsers, deleteUser } from '../util/api.js';

export const DogsContext = createContext();

export const DogsContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [likedImages, setLikedImages] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageNames, setImageNames] = useState({});

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
            const favoriteToRemove = likedImages.find(img => img._id === favoriteId);
            if (favoriteToRemove && currentUser.profilePicture === favoriteToRemove.imageSrc) {
                await unsetProfilePicture();
            }
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

    const setCurrentUserAndFavorites = async (user) => {
        setCurrentUser(user);
        if (user) {
            try {
                const response = await fetchFavorites(user._id);
                setLikedImages(response.data || []);
            } catch (error) {
                console.error('Error fetching user favorites:', error);
                setLikedImages([]);
            }
        } else {
            setLikedImages([]);
        }
    };

    const addUser = async (name) => {
        try {
            const response = await newUser(name);
            await updateAllUsers();
            return response.data;
        } catch (error) {
            console.error('Error adding user:', error);
            return null;
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

    const updateImageName = (imageUrl, name) => {
        setImageNames(prev => ({
            ...prev,
            [imageUrl]: name
        }));
    };

    const setProfilePicture = async (imageUrl) => {
        if (!currentUser) return;
        try {
            // Assuming you have an API endpoint to update user profile picture
            // await updateUserProfilePic(currentUser._id, imageUrl);
            setCurrentUser({
                ...currentUser,
                profilePicture: imageUrl
            });
        } catch (error) {
            console.error('Error updating profile picture:', error);
        }
    };

    const unsetProfilePicture = async () => {
        if (!currentUser) return;
        try {
            setCurrentUser({
                ...currentUser,
                profilePicture: ''
            });
        } catch (error) {
            console.error('Error unsetting profile picture:', error);
        }
    };

    return (
        <DogsContext.Provider value={{
            currentUser,
            setCurrentUser: setCurrentUserAndFavorites,
            likedImages,
            loading,
            users,
            addUser,
            removeUser,
            addToFavorites,
            removeFromFavorites,
            updateAllFavorites,
            imageNames,
            updateImageName,
            setProfilePicture,
            unsetProfilePicture,
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
