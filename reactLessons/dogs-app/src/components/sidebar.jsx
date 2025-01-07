import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './css/sidebar.css';

function SideBar({ selectedBreed, onSelectBreed }) {
  const [breeds, setBreeds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then((res) => res.json())
      .then((data) => setBreeds(Object.keys(data.message)))
      .catch((error) => console.error('Error fetching breeds:', error));
  }, []);

  const handleBreedChange = (breed) => {
    onSelectBreed(breed);
    if (breed) {
      navigate(`/breeds/${breed}`);
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="sidebar">
      <h2>Select a breed</h2>
      <select
        value={selectedBreed}
        onChange={(e) => handleBreedChange(e.target.value)}
        className="select"
      >
        <option value="">Select a breed</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/favorites" className="favorites-button">
        Show Favorites
      </NavLink>
      <NavLink to="/breeds">Breeds</NavLink>
    </nav>
  );
}

export default SideBar;