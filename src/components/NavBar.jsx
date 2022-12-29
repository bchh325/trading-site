import React from 'react'
import { NavLink } from 'react-router-dom';


export default function NavBar() {
    return (
        <div className="navbar">
            <NavLink className="navbutton" exact="true" to="/">Home</NavLink>
            <NavLink className="navbutton" to="/register">Register</NavLink>
            <NavLink className="navbutton" to="/stocks">Stock Content</NavLink>
        </div>
    )
}
