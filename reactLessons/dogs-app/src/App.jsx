import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout.jsx';
import Page, { DummyPage } from './components/dummyPages.jsx';
import './App.css';
import DummyLayout from './components/dummyPages.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Layout />} />
        <Route path='/favorites' element={<Layout />} />
        <Route path='/page' element={<DummyLayout />}>
          <Route path=':num' element={<DummyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
