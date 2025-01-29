import React, { useState } from 'react'
import { useDogsContext } from './context'
import './css/image.css'

function Image({ url, breed, favorite, onToggleFavorite }) {
  const { currentUser, updateImageName, setProfilePicture, unsetProfilePicture, imageNames } = useDogsContext();
  const [isEditing, setIsEditing] = useState(false);
  const [imageName, setImageName] = useState(imageNames[url] || '');
  const isProfilePicture = currentUser?.profilePicture === url;

  const handleNameSubmit = (e) => {
    e.preventDefault();
    updateImageName(url, imageName);
    setIsEditing(false);
  };

  return (
    <div className="image-container">
      <img src={url} alt={breed} className="image" />
      <button
        className={`heart-button ${favorite ? 'favorite' : ''}`}
        aria-label="toggle favorite"
        onClick={() => onToggleFavorite(url)}>
        <i className={`fa ${favorite ? 'fa-heart' : 'fa-heart-o'}`} aria-hidden="true" />
      </button>
      {favorite && currentUser && (
        <div className="image-actions">
          {isEditing ? (
            <form onSubmit={handleNameSubmit}>
              <input
                type="text"
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
                placeholder="Enter image name"
              />
              <button type="submit">Save</button>
            </form>
          ) : (
            <button onClick={() => setIsEditing(true)}>
              {imageNames[url] || 'Name Image'}
            </button>
          )}
          <button onClick={() => isProfilePicture ? unsetProfilePicture() : setProfilePicture(url)}>
            {isProfilePicture ? 'Remove Profile Picture' : 'Set as Profile Picture'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Image