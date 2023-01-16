import React from 'react'
import styles from './css_modules/UserInput.module.css'
import { useState } from 'react'

import axios from 'axios'


export default function UserInput({ dataHandler }) {
  const [tickerInput, setTickerInput] = useState("")
  const AUTH_KEY = localStorage.getItem("AUTH_KEY") 

  const handleInfo = (e) => {
    const { value } = e.target;
    setTickerInput(value.toUpperCase())
  }

  const handleSubmit = async (e) => {
    const isAuthenticated = JSON.parse(localStorage.getItem("IS_AUTHENTICATED")) 

    console.log("Submission")
    console.log("isAuthenticated: ", isAuthenticated)
    console.log(typeof isAuthenticated)

    let route, method

    if (isAuthenticated) {
      console.log("auth routes and method")
      route = "user/tickers"
      method = "POST"
    }
    else if (!isAuthenticated) {
      console.log("unauth routes and method")
      route = "unauthenticated/tickers"
      method = "GET"
    }

    e.preventDefault()
    console.log("submit")
    const request = {
      host: process.env.REACT_APP_DYNAMOAPI,
      method: method,
      params: {username: localStorage.getItem("USERNAME"), tickerToAdd: tickerInput.toUpperCase()},
      url: process.env.REACT_APP_DYNAMOAPI + "/" + route,
      path: route,
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
          'Authorization': AUTH_KEY
      }
  }

  const response = await axios(request)
  const temp = JSON.parse(response.data.body)
  setTickerInput("")
  dataHandler(tickerInput, temp[tickerInput])
  }

  return (
    <div className={styles["input-container"]}>
      <form onSubmit={handleSubmit}>
        <input className={styles["ticker-input"]} type="text" value={tickerInput} onChange={handleInfo}></input>
        <button type="submit">+</button>
      </form>
    </div>
  )
}
