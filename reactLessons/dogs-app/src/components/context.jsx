import {createContext, useContext, useState, useEffect} from 'react'

export const DogsContext = createContext()

export const DogsContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState('')
    const [likedImages, setLikedImages] = useState([])
    
    const value = { currentUser, setCurrentUser, likedImages, setLikedImages, }

  return (
    <DogsContext.Provider value={props.value}>
      {props.children}
    </DogsContext.Provider>
  )
}
