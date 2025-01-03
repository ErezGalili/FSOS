import react, { useState } from 'react'
import './App.css'
import Home from './pagers/Home'
import Gallery from './pagers/Gallery'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TheMenorah from './components/Menorah'
import Calculator from './components/Calculator'


function App() {
  return (<>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/gallery" element={<Gallery/>}/>
            <Route path="/menorah" element={<TheMenorah night="3"/>}/>
            <Route path="/calculator" element={<Calculator/>}/>
          </Routes>
        </BrowserRouter>
    </>)
}

export default App
