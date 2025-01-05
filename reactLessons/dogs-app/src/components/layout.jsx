import { useEffect, useState } from 'react';
import { getFromLocalStorage, isLiked, addToLiked, removeFromLiked } from '../util/likedUtils';
import { BreedImages, Favorites } from './imageCollection.jsx';
import SideBar from './sidebar.jsx';
import Header from './header.jsx';
import './css/layout.css';

function Layout(){
    const [selectedBreed, setSelectedBreed] = useState('shihtzu');
    const [favoriteImages, setFavoriteImages] = useState(getFromLocalStorage('favoriteImages'));
    const [showFavorites, setShowFavorites] = useState(false);
  
    const handleToggleFavorite = (url) => {
      if (isLiked(url, favoriteImages)) {
        removeFromLiked(url, favoriteImages);
        setFavoriteImages(favoriteImages.filter((image) => image !== url));
      } else {
        addToLiked(url, favoriteImages);
        setFavoriteImages([...favoriteImages, url]);
      }
    };
  
    const handleShowFavorites = () => {
      setShowFavorites(true);
      setSelectedBreed(null);
    };
  
    const handleSelectBreed = (breed) => {
      setSelectedBreed(breed);
      setShowFavorites(false);
    };
  
    return (
      <div className="container">
        <Header />
        <main>
          <div className="sidebar-container">
            <SideBar onSelectBreed={handleSelectBreed} onShowFavorites={handleShowFavorites} />
          </div>
          <div className="gallery-container">
            {showFavorites ? (
              <Favorites
                favoriteImages={favoriteImages}
                onToggleFavorite={handleToggleFavorite}
              />
            ) : selectedBreed ? (
              <BreedImages
                breed={selectedBreed}
                favoriteImages={favoriteImages}
                onToggleFavorite={handleToggleFavorite}
              />
            ) : (
              <h2>Select a breed to view images</h2>
            )}
          </div>
        </main>
      </div>
    );
}

export default Layout