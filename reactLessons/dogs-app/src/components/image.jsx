import React from 'react'
import './css/image.css'

function Image({ url, breed, favorite, onToggleFavorite }) {
  return (
    <div className="image-container">
      <img src={url} alt={breed} className="image" />
      <button
        className={`heart-button ${favorite ? 'favorite' : ''}`}
        aria-label="toggle favorite"
        onClick={() => onToggleFavorite(url)}
      >
        <i className={`fa ${favorite ? 'fa-heart' : 'fa-heart-o'}`} aria-hidden="true" />
      </button>
    </div>
  );
}

export default Image