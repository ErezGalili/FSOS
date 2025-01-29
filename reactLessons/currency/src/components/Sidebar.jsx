import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function Sidebar() {
  const [currencies, setCurrencies] = useState({});

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('https://api.vatcomply.com/currencies');
        setCurrencies(response.data);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Currencies</h2>
      <nav className="sidebar-nav">
        <ul className="sidebar-list">
          {Object.entries(currencies).map(([code, details]) => (
            <li key={code} className="sidebar-item">
              <Link to={`/${code}`} className="sidebar-link">
                {details.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;