import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './css_modules/NavBar.module.css'


export default function NavBar() {
    return (
        <div className={styles.nav}>
            <NavLink className={styles["nav-button"]} exact="true" to="/">Home</NavLink>
            <NavLink className={styles["nav-button"]} to="/register">Register</NavLink>
            <NavLink className={styles["nav-button"]} to="/stocks">Stock Content</NavLink>
        </div>
    )
}
