import React, { useState } from "react";
import "./css/header.css";
import { getUsers, getCurrentUser, setCurrentUser } from "../util/userUtil";

function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentUser, setUser] = useState(getCurrentUser());

  const handleUserChange = (userId) => {
    setCurrentUser(userId);
    setUser(getCurrentUser());
    setShowUserMenu(false);
    window.location.reload(); // Refresh to update favorites
  };

  return (
    <header>
      <h1>Dog Breeds</h1>
      <div className="user-menu-container">
        <div 
          className="user-circle" 
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          {currentUser.name[0]}
        </div>
        {showUserMenu && (
          <div className="user-menu">
            {getUsers().map(user => (
              <div 
                key={user.id}
                className={`user-option ${user.id === currentUser.id ? 'active' : ''}`}
                onClick={() => handleUserChange(user.id)}
              >
                {user.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;