import { useEffect, useState } from 'react';
import './App.css';

const getFromLocalStorage = (key) => {
  const str = localStorage.getItem(key);
  return str ? JSON.parse(str) : [];
}

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

const isLiked = (item, liked) => {
  return liked.includes(item);
}

const addToLiked = (item, liked) => {
  if (!liked.includes(item)) liked.push(item);
  saveToLocalStorage('favoriteImages', liked);
};

const removeFromLiked = (item, liked) => {
  const index = liked.indexOf(item);
  if (index !== -1) liked.splice(index, 1);
  saveToLocalStorage('favoriteImages', liked);
};

function Image({ url, breed, favorite, onToggleFavorite }) {
  return (
    <div
      className="image-container"
      role="button"
      tabIndex={0}
      onClick={() => onToggleFavorite(url)}
      onKeyPress={(e) =>
        (e.key === 'Enter' || e.key === ' ') && onToggleFavorite(url)
      }
    >
      <img src={url} alt={breed} className="image" />
      <button
        className={`heart-button ${favorite ? 'favorite' : ''}`}
        aria-label="toggle favorite"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(url);
        }}
      >
        <i className={`fa ${favorite ? 'fa-heart' : 'fa-heart-o'}`} aria-hidden="true" />
      </button>
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

function SideBar({ onSelectBreed }) {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then((res) => res.json())
      .then((data) => setBreeds(Object.keys(data.message)))
      .catch((error) => console.error('Error fetching breeds:', error));
  }, []);

  return (
    <nav className="sidebar">
      <h2>Select a breed</h2>
      <select
        onChange={(e) => onSelectBreed(e.target.value)}
        className="select"
      >
        <option value="">Select a breed</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
    </nav>
  );
}

function App() {
  const [selectedBreed, setSelectedBreed] = useState('shihtzu');
  const [favoriteImages, setFavoriteImages] = useState(getFromLocalStorage('favoriteImages'));

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
    <div className="container">
      <header>
        <h1>Dog Breeds</h1>
      </header>
      <main>
        <div className="sidebar-container">
          <SideBar onSelectBreed={setSelectedBreed} />
        </div>
        <div className="gallery-container">
          {selectedBreed ? (
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

export default App;

