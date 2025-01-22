import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout.jsx';
import { BreedImagesWrapper, FavoritesWrapper, RandomImages } from './components/imageCollection.jsx';
import './App.css';
import BreedNotFound from './components/BreedNotFound.jsx';
import Sandbox from './components/sandbox.jsx';
import { DogsContextProvider } from './components/context.jsx';
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  return (
    <ErrorBoundary FallbackComponent={BreedNotFound}>
      <DogsContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<RandomImages />} />
            <Route path="favorites" element={<FavoritesWrapper />} />
            <Route path="breeds" element={<RandomImages />} />
            <Route path="breeds/:breed" element={<BreedImagesWrapper />} />
            <Route path="*" element={<BreedNotFound />} />
          </Route>
          <Route path='/sandbox' element={<Sandbox/>} />
        </Routes>
      </DogsContextProvider>
    </ErrorBoundary>
  );
}

export default App;
