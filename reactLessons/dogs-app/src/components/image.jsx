import React from 'react'

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

export default Image