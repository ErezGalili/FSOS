import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { getCountryFlag } from '../utils/flags';
import '../App.css';

function Sidebar() {
  const [currencies, setCurrencies] = useState({});
  const location = useLocation();
  const [selectedCurrency, setSelectedCurrency] = useState(null);

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

  useEffect(() => {
    const currentCurrency = location.pathname.split('/')[1];
    setSelectedCurrency(currentCurrency);
  }, [location]);

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Currencies</h2>
      <nav className="sidebar-nav">
        <ul className="sidebar-list">
          <li><Link to="/" className="sidebar-link">🏠 Home</Link></li>
          {Object.entries(currencies).map(([code, details]) => (
            <li key={code} className={`sidebar-item ${selectedCurrency === code ? 'selected' : ''}`}>
              <Link to={`/${code}`} className="sidebar-link">
                <span className="country-flag">{getCountryFlag(code)}</span>
                <span className="currency-symbol">{details.symbol}</span>
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