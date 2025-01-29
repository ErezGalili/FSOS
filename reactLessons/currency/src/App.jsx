import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CurrencyPage from './components/CurrencyPage';
import HomePage from './components/HomePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:currencyCode" element={<CurrencyPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;