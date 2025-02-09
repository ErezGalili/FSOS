import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlightPage from './components/Flighttable';
import UserMenu from './components/UserMenu';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <UserMenu />
        <Routes>
          <Route path="/" element={<FlightPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
