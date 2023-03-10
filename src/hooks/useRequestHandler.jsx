import { ConsoleLogger } from '@aws-amplify/core'
import axios from 'axios'
import React, { useEffect, useInsertionEffect, useState } from 'react'

const useRequestHandler = (requestParams) => {
    const [data, setData] = useState(null)
    const AUTH_KEY = localStorage.getItem("AUTH_KEY")
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
    useEffect(() => {
        console.log("invoke useRequest")
        
        let isCancelled = false;
        const callApi = async () => {
            if (AUTH_KEY !== null) {
                if (!isCancelled) {
                    let qString = { username: requestParams.data.username }
                    if (requestParams.type === "POST") {
                        qString = { ...qString, ...{ tickerToAdd: requestParams.data.tickerToAdd } }
                    }
                    const request = {
                        host: process.env.REACT_APP_DYNAMOAPI,
                        method: requestParams.type,
                        params: qString,
                        url: process.env.REACT_APP_DYNAMOAPI + "/" + requestParams.route,
                        path: requestParams.route,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                            'Authorization': AUTH_KEY
                        }
                    }
                    const response = await axios(request)
                    console.log("1")
                    setData(response)
                }
            }
        }

        callApi()

        return () => {
            isCancelled = true
        }
    }, [])
    
    return [data]
}

export default useRequestHandler;