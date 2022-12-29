import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useRequestHandler from '../hooks/useRequestHandler'

export default function StockContent() {
    /*
    requestParams = {
        type: "GET" (HTTP REQUEST TYPE: GET/POST/etc.),
        route: "user/tickers" (DESIRED ROUTE),
        data: (state){
            username: testUsername,
            tickerToAdd: "AAPL"
        }
    }
    */
    const [data, setData] = useState(null)
    const [inputParams, setInputParams] = useState({
        username: "test_username",
        tickerToAdd: "AAPL"
    })

    const requestParams = {
        type: "GET",
        route: "user/tickers",
        data: inputParams
    }
    
    console.log(useRequestHandler(requestParams))

    return (
        <div>APITest</div>
    )
}
