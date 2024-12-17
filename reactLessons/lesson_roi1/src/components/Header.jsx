import React from "react"
import { NavLink } from "react-router-dom"


const Header = (props) =>{
    return(
        <div>
            <header>{props.title} {props.number}
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/Gallery">Gallery</NavLink>
            </nav>
            </header>
        </div>
    )
}

export default Header