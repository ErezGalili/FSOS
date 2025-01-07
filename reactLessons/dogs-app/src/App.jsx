import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout.jsx';
import { BreedImagesWrapper, FavoritesWrapper } from './components/imageCollection.jsx';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<BreedImagesWrapper />} />
        <Route path="favorites" element={<FavoritesWrapper />} />
      </Route>
    </Routes>
  );
}

export default App;
