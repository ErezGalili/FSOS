import { useEffect, useState } from 'react';
import './App.css';

function BreedImages({ breed }) {
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (breed) {
      fetch(`https://dog.ceo/api/breed/${breed}/images/random/20`)
        .then(res => res.json())
        .then(data => setImages(data.message));
    }
  }, [breed]);
  if (images.length === 0) return null;
  return (
    <div className="gallery">
      {images.map((url, index) => (
        <img key={index} src={url} alt={`${breed}`} />
      ))}
    </div>
  );
}

function SearchBreeds() {
  const [search, setSearch] = useState('');
  const [breeds, setBreeds] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search && !breeds.includes(search)) {
      setBreeds([...breeds, search]);
    }
    setSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <input
        type="text"
        value={search}
        placeholder="Search a breed..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

function SideBar({ onSelectBreed }) {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(res => res.json())
      .then(data => setBreeds(Object.keys(data.message)));
  }, []);

  return (
    <nav className="sidebar">
      <select onChange={e => onSelectBreed(e.target.value)}>
        <option value="">Select a breed</option>
        {breeds.map(breed => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
    </nav>
  );
}

function App() {
  const [selectedBreed, setSelectedBreed] = useState(null);

  return (
    <div className="container">
      <header>
        <h1>Dog Breeds</h1>
      </header>
      <main style={{ display: 'flex' }}>
        <SideBar onSelectBreed={setSelectedBreed} />
        <div style={{ flex: 1 }}>
          {selectedBreed ? <BreedImages breed={selectedBreed} /> : <h2>Select a breed</h2>}
        </div>
      </main>
    </div>
  );
}

export default App;

