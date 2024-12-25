import { useState } from 'react'
import './App.css'

function Books() {
  const [book, setBook] = useState('')
  
  return (
    <div>
      <h1>Books</h1>
    </div>
  )
}

function App() {

  return (
    <>
      <Books />
    </>
  )
}

export default App
