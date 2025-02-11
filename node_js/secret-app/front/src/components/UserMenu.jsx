import React, { useState, useEffect } from 'react';
import { login, register, getUsers, switchToUser, promoteUser } from '../utils/authApi';

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignUpForm, setShowSignUpForm] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [signUpData, setSignUpData] = useState({ email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [userData, setUserData] = useState(null);
    const [users, setUsers] = useState([]);
    const [showUserSwitch, setShowUserSwitch] = useState(false);
    const [switchLoginData, setSwitchLoginData] = useState({ email: '', password: '' });
    const [showSwitchLoginModal, setShowSwitchLoginModal] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState('');
    const [userPasswords, setUserPasswords] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUserData = localStorage.getItem('userData');
        if (token && storedUserData) {
            setIsLoggedIn(true);
            setUserData(JSON.parse(storedUserData));
            fetchUsers(); // Move fetchUsers here to only run after successful login
        }
    }, []); // Remove isLoggedIn dependency to prevent loops

    const fetchUsers = async () => {
        try {
            const usersData = await getUsers();
            // Filter out users that haven't logged in
            const activeUsers = usersData.filter(user => user.lastLogin);
            setUsers(activeUsers);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            setError('Failed to fetch users');
        }
    };

    const switchUser = async (email, password) => {
        try {
            const data = await login({ email, password });
            // Store password for future switches
            setUserPasswords(prev => ({
                ...prev,
                [email]: password
            }));
            localStorage.setItem('token', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));
            setUserData(data.user);
            setShowSwitchLoginModal(false);
            setShowUserSwitch(false);
            window.location.reload();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSwitchAttempt = async (user) => {
        try {
            const data = await switchToUser(user._id);
            localStorage.setItem('token', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));
            setUserData(data.user);
            setShowUserSwitch(false);
            window.location.reload();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSwitchLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(switchLoginData);
            // Store password for future switches
            setUserPasswords(prev => ({
                ...prev,
                [switchLoginData.email]: switchLoginData.password
            }));
            localStorage.setItem('token', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));
            setUserData(data.user);
            setShowSwitchLoginModal(false);
            setShowUserSwitch(false);
            window.location.reload();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await login({
                email: loginData.email,
                password: loginData.password
            });
            
            if (data && data.token) {
                // Store password for this user
                setUserPasswords(prev => ({
                    ...prev,
                    [loginData.email]: loginData.password
                }));
                localStorage.setItem('token', data.token);
                localStorage.setItem('userData', JSON.stringify(data.user));
                setUserData(data.user);
                setIsLoggedIn(true);
                setShowLoginForm(false);
                window.location.reload();
            } else {
                setError('Invalid response from server');
            }
        } catch (error) {
            setError(error.message || 'Login failed');
        }
    };

    const handleInputChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        if (signUpData.password !== signUpData.confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        try {
            const data = await register({
                email: signUpData.email,
                password: signUpData.password
            });
            
            // Update local storage with new user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));
            
            // Update state
            setUserData(data.user);
            setIsLoggedIn(true);
            setShowSignUpForm(false);
            setError('');
            
            // Fetch updated users list
            await fetchUsers();
            
            // Refresh page
            window.location.reload();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSignUpInputChange = (e) => {
        setSignUpData({
            ...signUpData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setIsLoggedIn(false);
        setUserData(null);
        window.location.reload();
    };

    const handleNewLogin = () => {
        setLoginData({ email: '', password: '' });
        setShowLoginForm(true);
        setError('');
    };

    const handleNewSignup = () => {
        setSignUpData({ email: '', password: '', confirmPassword: '' });
        setShowSignUpForm(true);
        setError('');
    };

    const handlePromoteUser = async (userId) => {
        try {
            await promoteUser(userId);
            setError('');
            fetchUsers(); // Refresh user list
        } catch (error) {
            setError(error.message || 'Failed to promote user');
        }
    };

    return (
        <div className="user-menu">
            <button className="user-menu-button" onClick={() => setIsOpen(!isOpen)}>
                {isLoggedIn ? (userData?.email || 'Menu') : 'Login/Sign Up'}
            </button>
            
            {isOpen && (
                <div className="user-menu-dropdown">
                    {error && <div className="error">{error}</div>}
                    {isLoggedIn && userData ? (
                        <>
                            <div className="current-user">
                                Logged in as: {userData.email}
                            </div>
                            <div className="switch-user">
                                <button 
                                    className="switch-button"
                                    onClick={() => setShowUserSwitch(!showUserSwitch)}
                                >
                                    Switch User
                                </button>
                                {showUserSwitch && (
                                    <div className="user-switch-container">
                                        <div className="user-list">
                                            {users.map(user => (
                                                <div key={user._id} className="user-list-item">
                                                    <button
                                                        className="user-option"
                                                        onClick={() => handleSwitchAttempt(user)}
                                                        disabled={user.email === userData.email}
                                                    >
                                                        {user.email} {user.isAdmin ? '(Admin)' : ''}
                                                    </button>
                                                    {userData.isAdmin && !user.isAdmin && (
                                                        <button 
                                                            className="promote-button"
                                                            onClick={() => handlePromoteUser(user._id)}
                                                            title="Promote to Admin"
                                                        >
                                                            👑
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="switch-auth-buttons">
                                            <button 
                                                className="switch-login-button"
                                                onClick={handleNewLogin}
                                            >
                                                New Login
                                            </button>
                                            <button 
                                                className="switch-signup-button"
                                                onClick={handleNewSignup}
                                            >
                                                Sign Up
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {(showLoginForm || showSignUpForm) && (
                                <div className="auth-form-container">
                                    {showLoginForm ? (
                                        <form onSubmit={handleLoginSubmit} className="login-form">
                                            <div>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    value={loginData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    placeholder="Password"
                                                    value={loginData.password}
                                                    onChange={handleInputChange}
                                                    required
                                                    minLength={5}
                                                />
                                            </div>
                                            <button type="submit" className="login-button">Login</button>
                                            <button 
                                                type="button" 
                                                className="cancel-button"
                                                onClick={() => setShowLoginForm(false)}
                                            >
                                                Cancel
                                            </button>
                                        </form>
                                    ) : (
                                        <form onSubmit={handleSignUpSubmit} className="signup-form">
                                            <div>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    value={signUpData.email}
                                                    onChange={handleSignUpInputChange}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    placeholder="Password"
                                                    value={signUpData.password}
                                                    onChange={handleSignUpInputChange}
                                                    required
                                                    minLength={5}
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    placeholder="Confirm Password"
                                                    value={signUpData.confirmPassword}
                                                    onChange={handleSignUpInputChange}
                                                    required
                                                    minLength={5}
                                                />
                                            </div>
                                            <button type="submit" className="signup-button">Sign Up</button>
                                            <button 
                                                type="button" 
                                                className="cancel-button"
                                                onClick={() => setShowSignUpForm(false)}
                                            >
                                                Cancel
                                            </button>
                                        </form>
                                    )}
                                </div>
                            )}
                            <button className="logout-button" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : showLoginForm ? (
                        <form onSubmit={handleLoginSubmit} className="login-form">
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={loginData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={loginData.password}
                                    onChange={handleInputChange}
                                    required
                                    minLength={5}
                                />
                            </div>
                            <button type="submit" className="login-button">Login</button>
                            <button 
                                type="button" 
                                className="cancel-button"
                                onClick={() => setShowLoginForm(false)}
                            >
                                Cancel
                            </button>
                        </form>
                    ) : showSignUpForm ? (
                        <form onSubmit={handleSignUpSubmit} className="signup-form">
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={signUpData.email}
                                    onChange={handleSignUpInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={signUpData.password}
                                    onChange={handleSignUpInputChange}
                                    required
                                    minLength={5}
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={signUpData.confirmPassword}
                                    onChange={handleSignUpInputChange}
                                    required
                                    minLength={5}
                                />
                            </div>
                            <button type="submit" className="signup-button">Sign Up</button>
                            <button 
                                type="button" 
                                className="cancel-button"
                                onClick={() => setShowSignUpForm(false)}
                            >
                                Cancel
                            </button>
                        </form>
                    ) : (
                        <div className="auth-buttons">
                            <button 
                                className="login-button" 
                                onClick={() => setShowLoginForm(true)}
                            >
                                Login
                            </button>
                            <button 
                                className="signup-button" 
                                onClick={() => setShowSignUpForm(true)}
                            >
                                Sign Up
                            </button>
                        </div>
                    )}

                    {showSwitchLoginModal && (
                        <div className="switch-login-modal">
                            <h3>Login as {selectedEmail}</h3>
                            <form onSubmit={handleSwitchLoginSubmit}>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={switchLoginData.password}
                                    onChange={(e) => setSwitchLoginData(prev => ({
                                        ...prev,
                                        password: e.target.value
                                    }))}
                                    required
                                />
                                <button type="submit" className="login-button">
                                    Login
                                </button>
                                <button 
                                    type="button" 
                                    className="cancel-button"
                                    onClick={() => {
                                        setShowSwitchLoginModal(false);
                                        setError('');
                                    }}
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserMenu;
