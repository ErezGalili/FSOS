import React, { useState } from "react";
import "./css/header.css";
import { useDogsContext } from "./context";

function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const { currentUser, setCurrentUser, users, addUser, removeUser, unsetProfilePicture } = useDogsContext();

  const handleUserChange = async (user) => {
    await setCurrentUser(user);
    setShowUserMenu(false);
  };

  const handleAddUser = async () => {
    if (newUserName.trim()) {
      const newUser = await addUser(newUserName.trim());
      if (newUser) {
        setCurrentUser(newUser);
        setNewUserName("");
        setShowUserMenu(false);
      }
    }
  };

  const handleRemoveUser = async (userId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this user?')) {
      await removeUser(userId);
      if (currentUser?._id === userId) {
        setCurrentUser(null);
      }
    }
  };

  return (
    <header>
      <h1 className="header-title">Dog Breeds</h1>
      <div className="user-menu-container">
        {currentUser ? (
          <div 
            className="user-circle" 
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={currentUser.profilePicture ? {
              backgroundImage: `url(${currentUser.profilePicture})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            } : {}}
          >
            {!currentUser.profilePicture && currentUser.name[0]}
          </div>
        ) : (
          <button className="select-user-button" onClick={() => setShowUserMenu(!showUserMenu)}>
            Select User
          </button>
        )}
        {showUserMenu && (
          <div className="user-menu">
            <div className="add-user">
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="New user name"
                className="add-user-input"
              />
              <button className="add-user-button" onClick={handleAddUser}>Add</button>
            </div>
            {currentUser?.profilePicture && (
              <div className="menu-option" onClick={unsetProfilePicture}>
                Remove Profile Picture
              </div>
            )}
            {users.map(user => (
              <div 
                key={user._id}
                className={`user-option ${user._id === currentUser?._id ? 'active' : ''}`}
                onClick={() => handleUserChange(user)}>
                <span className="user-name">
                  {user.name}
                </span>
                <button onClick={(e) => handleRemoveUser(user._id, e)}
                  className="delete-user">×</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
