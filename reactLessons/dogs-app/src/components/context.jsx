import {createContext, useContext, useState, useEffect} from 'react'
import { getFavorites, newFavorite, deleteFavorite } from '../util/api.js'
export const DogsContext = createContext()

export const DogsContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState('')
    const [likedImages, setLikedImages] = useState([])
    
    const updateAllFavorites = () => {
            currentUser && getFavorites(currentUser)
            .then((favorites) => setLikedImages(favorites))
            .catch((error) => console.log(error))
    }

    useEffect(() => {updateAllFavorites()}, [currentUser])

    const addToFavorites = (imageSrc) => {newFavorite(currentUser, imageSrc)}
    const removeFromFavorites = (favoriteId) => {deleteFavorite(currentUser, favoriteId).then(() => updateAllFavorites(currentUser))}
    
    const value = { currentUser, setCurrentUser, likedImages, setLikedImages, updateAllFavorites, addToFavorites, removeFromFavorites }

  return (
    <DogsContext.Provider value={props.value}>
      {props.children}
    </DogsContext.Provider>
  )
}
