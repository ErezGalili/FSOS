import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = (props) => {
  return (
    <header className='header' style={{backgroundColor: props.bgColor}}>
        <h1>{props.title}</h1>
        <nav className='nav'>
            <NavLink to="/" className="link">Home</NavLink>
            <NavLink to="/gallery" className="link">Gallery</NavLink>
        </nav>
    </header>
  )
}

export default Header