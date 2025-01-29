import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function CurrencyPage() {
  const { currencyCode } = useParams();
  const [rates, setRates] = useState(null);
  const [currencies, setCurrencies] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ratesResponse, currenciesResponse] = await Promise.all([
          axios.get(`https://api.vatcomply.com/rates?base=${currencyCode}`),
          axios.get('https://api.vatcomply.com/currencies')
        ]);
        setRates(ratesResponse.data);
        setCurrencies(currenciesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currencyCode]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!rates || !currencies) {
    return <div className="error">Error loading data</div>;
  }

  return (
    <div className="currency-page">
      <h1>{currencies[currencyCode]?.name}</h1>
      <ul className="currency-list">
        {Object.entries(rates.rates).map(([code, rate]) => (
          <li key={code} className="currency-item">
            {currencies[code]?.name}: {rate}{currencies[code]?.symbol}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CurrencyPage;