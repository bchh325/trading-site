import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './css_modules/NavBar.module.css'


export default function NavBar() {
    return (
        <div className={styles.nav}>
            <NavLink className={styles["nav-button"]} exact="true" to="/"><span>Sign In</span></NavLink>
            <NavLink className={styles["nav-button"]} to="/register"><span>Register</span></NavLink>
            <NavLink className={styles["nav-button"]} to="/stocks"><span>Stock Content</span></NavLink>
        </div>
    )
}
