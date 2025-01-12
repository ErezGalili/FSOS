import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout.jsx';
import { BreedImagesWrapper, FavoritesWrapper, RandomImages } from './components/imageCollection.jsx';
import './App.css';
import BreedNotFound from './components/BreedNotFound.jsx';
import Sandbox from './components/sandbox.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} errorElement={<BreedNotFound />}>
        <Route index element={<RandomImages />} />
        <Route path="favorites" element={<FavoritesWrapper />} />
        <Route path="breeds" element={<RandomImages />} />
        <Route path="breeds/:breed" element={<BreedImagesWrapper />} />
        <Route path="*" element={<BreedNotFound />} />
      </Route>
      <Route path='/sandbox' element={<Sandbox/>} />
    </Routes>
  );
}

export default App;
