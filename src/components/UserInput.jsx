import React from 'react'
import styles from './css_modules/UserInput.module.css'

export default function UserInput() {
  return (
    <div className={styles["input-container"]}>
        <input className={styles["ticker-input"]} type="text"></input>
        <button>+</button>
    </div>
  )
}
