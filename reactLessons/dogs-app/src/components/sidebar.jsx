import React, { useState, useEffect } from 'react';
import './css/sidebar.css';

function SideBar({ onSelectBreed, onShowFavorites }) {
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
      <button className="favorites-button" onClick={onShowFavorites}>
        Show Favorites
      </button>
    </nav>
  );
}

export default SideBar;