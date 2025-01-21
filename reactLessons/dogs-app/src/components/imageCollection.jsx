import React, { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import Image from './image.jsx';
import { useDogsContext } from './context.jsx';

export function RandomImages() {
  const [images, setImages] = useState([]);
  const { likedImages, addToFavorites, removeFromFavorites, currentUser } = useDogsContext();

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random/12')
      .then((res) => res.json())
      .then((data) => setImages(data.message))
      .catch((error) => console.error('Error fetching images:', error));
  }, []);

  const handleToggleFavorite = (url) => {
    if (!currentUser) return;
    const isFavorited = likedImages.some(fav => fav.imageSrc === url);
    if (isFavorited) {
      const favorite = likedImages.find(fav => fav.imageSrc === url);
      removeFromFavorites(favorite._id);
    } else {
      addToFavorites(url);
    }
  };

  if (!images || images.length === 0) return <h3>Loading images...</h3>;

  return (
    <div className="gallery">
      {images.map((url, index) => (
        <Image 
          key={index} 
          url={url} 
          breed="Random" 
          favorite={likedImages.some(fav => fav.imageSrc === url)}
          onToggleFavorite={handleToggleFavorite} 
        />
      ))}
    </div>
  );
}

function BreedImages({ breed, favoriteImages, onToggleFavorite }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (breed) {
      fetch(`https://dog.ceo/api/breed/${breed}/images/random/12`)
        .then((res) => res.json())
        .then((data) => setImages(data.message))
        .then((data) => {
          if (data.status === 'error') {
            setImages([]);
          } else {
            setImages(data.message);
          }
        })
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
  const { selectedBreed } = useOutletContext() || useParams();
  const { likedImages, addToFavorites, removeFromFavorites, currentUser } = useDogsContext();

  const handleToggleFavorite = (url) => {
    if (!currentUser) return;
    const isFavorited = likedImages.some(fav => fav.imageSrc === url);
    if (isFavorited) {
      const favorite = likedImages.find(fav => fav.imageSrc === url);
      removeFromFavorites(favorite._id);
    } else {
      addToFavorites(url);
    }
  };

  return (
    <BreedImages
      breed={selectedBreed}
      favoriteImages={likedImages}
      onToggleFavorite={handleToggleFavorite}
    />
  );
}

function Favorites({ favoriteImages, onToggleFavorite }) {
  if (!favoriteImages || favoriteImages.length === 0) return <h3>No favorites selected yet!</h3>;

  return (
    <div className="gallery">
      {favoriteImages.map((favorite, index) => (
        <Image
          key={index}
          url={favorite.imageSrc}
          breed="Favorite"
          favorite={true}
          onToggleFavorite={() => onToggleFavorite(favorite.imageSrc)}
        />
      ))}
    </div>
  );
}

function FavoritesWrapper() {
  const { likedImages, removeFromFavorites, currentUser } = useDogsContext();

  const handleToggleFavorite = (url) => {
    if (!currentUser) return;
    const favorite = likedImages.find(fav => fav.imageSrc === url);
    if (favorite) {
      removeFromFavorites(favorite._id);
    }
  };

  return (
    <Favorites
      favoriteImages={likedImages}
      onToggleFavorite={handleToggleFavorite}
    />
  );
}

export { BreedImagesWrapper, FavoritesWrapper };