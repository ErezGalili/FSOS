import { BrowserRouter, Routes, Route } from 'react-router-dom'
import react from 'react'
import './App.css'
import Gallery from './components/pages/Gallery'
import Home from './components/pages/Home'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/gallery' element={<Gallery />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
