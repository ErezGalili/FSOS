import react, { useState } from 'react'
import './App.css'
import Home from './pagers/Home'
import Gallery from './pagers/Gallery'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (<>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/gallery" element={<Gallery/>}/>
          </Routes>
        </BrowserRouter>
    </>)
}

export default App
