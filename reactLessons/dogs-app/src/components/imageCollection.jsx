import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Image from './image.jsx';
import { isLiked, getFromLocalStorage, addToLiked, removeFromLiked } from '../util/likedUtils';

function BreedImages({ breed, favoriteImages, onToggleFavorite }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (breed) {
      fetch(`https://dog.ceo/api/breed/${breed}/images/random/12`)
        .then((res) => res.json())
        .then((data) => setImages(data.message))
        .catch((error) => console.error('Error fetching images:', error));
    }
  }, [breed]);

  if (!images || images.length === 0) return <h3>Loading images...</h3>;

  return (
    <div className="gallery">
      {images.map((url, index) => (
        <Image
          key={index}
          url={url}
          breed={breed}
          favorite={isLiked(url, favoriteImages)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

function BreedImagesWrapper() {
  const { selectedBreed } = useOutletContext();
  const [favoriteImages, setFavoriteImages] = useState(getFromLocalStorage('favoriteImages') || []);

  const handleToggleFavorite = (url) => {
    if (isLiked(url, favoriteImages)) {
      removeFromLiked(url, favoriteImages);
      setFavoriteImages(favoriteImages.filter((image) => image !== url));
    } else {
      addToLiked(url, favoriteImages);
      setFavoriteImages([...favoriteImages, url]);
    }
  };

  return (
    <BreedImages
      breed={selectedBreed}
      favoriteImages={favoriteImages}
      onToggleFavorite={handleToggleFavorite}
    />
  );
}

function Favorites({ favoriteImages, onToggleFavorite }) {
  if (!favoriteImages || favoriteImages.length === 0) return <h3>No favorites selected yet!</h3>;

  return (
    <div className="gallery">
      {favoriteImages.map((url, index) => (
        <Image
          key={index}
          url={url}
          breed="Favorite"
          favorite={true}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

function FavoritesWrapper() {
  const [favoriteImages, setFavoriteImages] = useState(getFromLocalStorage('favoriteImages') || []);

  const handleToggleFavorite = (url) => {
    if (isLiked(url, favoriteImages)) {
      removeFromLiked(url, favoriteImages);
      setFavoriteImages(favoriteImages.filter((image) => image !== url));
    } else {
      addToLiked(url, favoriteImages);
      setFavoriteImages([...favoriteImages, url]);
    }
  };

  return (
    <Favorites
      favoriteImages={favoriteImages}
      onToggleFavorite={handleToggleFavorite}
    />
  );
}

export { BreedImagesWrapper, FavoritesWrapper };