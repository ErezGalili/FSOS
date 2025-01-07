import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './css/sidebar.css';

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
      <NavLink to="/favorites" className="favorites-button">
        Show Favorites
      </NavLink>
        <NavLink to="/">Home</NavLink>
    </nav>
  );
}

export default SideBar;