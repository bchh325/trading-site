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
    const [dataNull, setDataNull] = useState(true)
    const [inputParams, setInputParams] = useState({
        username: "test_username",
        tickerToAdd: "AAPL"
    })

    const requestParams = {
        type: "GET",
        route: "user/tickers",
        data: inputParams
    }

    const response = useRequestHandler(requestParams)

    useEffect(() => {
        if (response !== null) {
            console.log(JSON.parse(response.data.body))
            setData(JSON.parse(response.data.body))
            setDataNull(false)
        }
    }, [response])

    console.log("IN", typeof data)
    if (data !== null) {
        console.log(Object.keys(data))
    }

    return (
        <div>
            Test
            <br></br>
            { data && Object.keys(data).map((key) => {
                const dataString = JSON.stringify(data[key])
                if (data) {
                    return <p>{key}: {dataString}</p>
                }
            })}
        </div>
    )
}
