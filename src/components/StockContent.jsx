import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useRequestHandler from '../hooks/useRequestHandler'
import TickerDisplay from './TickerDisplay'
import styles from './css_modules/StockContent.module.css'
import UserInput from './UserInput'

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
    const sampleTickerData = {
        "TQQQ": {
            "c": 19.41,
            "d": 0.92,
            "dp": 4.9757,
            "h": 19.435,
            "l": 18.52,
            "o": 18.685,
            "pc": 18.49,
            "t": 1673470804
        }
        //Negative Percent Change "c":59.85,"d":-9.43,"dp":-13.6114,"h":69.75,"l":56.4,"o":69.75,"pc":69.28,"t":1673470802
    }
    const sampleTickerData2 = {
        "CALX": {
            "c": 59.85, "d": -9.43, "dp": -13.6114, "h": 69.75, "l": 56.4, "o": 69.75, "pc": 69.28, "t": 1673470802
        }
        //Negative Percent Change "c":59.85,"d":-9.43,"dp":-13.6114,"h":69.75,"l":56.4,"o":69.75,"pc":69.28,"t":1673470802
    }

    const multipleTicker = {
        "TQQQ": {
            "c": 19.41,
            "d": 0.92,
            "dp": 4.9757,
            "h": 19.435,
            "l": 18.52,
            "o": 18.685,
            "pc": 18.49,
            "t": 1673470804
        }, "CALX": {
            "c": 59.85, "d": -9.43, "dp": -13.6114, "h": 69.75, "l": 56.4, "o": 69.75, "pc": 69.28, "t": 1673470802
        },
        "CALX": {
            "c": 59.85, "d": -9.43, "dp": -13.6114, "h": 69.75, "l": 56.4, "o": 69.75, "pc": 69.28, "t": 1673470802
        }
    }

    const [data, setData] = useState(null)
    const [dataNull, setDataNull] = useState(true)
    const [inputParams, setInputParams] = useState({
        username: localStorage.getItem("USERNAME"),
        tickerToAdd: "TQQQ"
    })

    const requestParams = {
        type: "GET",
        route: "user/tickers",
        data: inputParams
    }

    const handleSetData = (key, value) => {
        setData(prev => ({...prev,
            [key]: value
        }))
    }

    /*
    {
        "ABC": {
            "c": 164.9,
            "d": -0.49,
            "dp": -0.2963,
            "h": 165.965,
            "l": 164.12,
            "o": 165.26,
            "pc": 165.39,
            "t": 1673557202
        }
    }
    */
    const [response] = useRequestHandler(requestParams)
    //refactoring planned
    useEffect(() => {
        if (response !== null && requestParams.type !== "POST") {
            console.log(JSON.parse(response.data.body))
            setData(JSON.parse(response.data.body))
            setDataNull(false)
        }
    }, [response])

    const extractTickerData = (tickerData) => {
        const tickerObject = tickerData[Object.keys(tickerData)[0]]
        return {
            tickerSymbol: Object.keys(tickerData)[0],
            openPrice: tickerObject.o,
            currentPrice: tickerObject.c,
            percentChange: tickerObject.dp
        }
    }
    console.log(data)

    console.log("IN", typeof data)
    if (data !== null) {
        console.log(Object.keys(data))
    }

    return (
        <div className={styles.container}>
            <div className={styles["legend-container"]}>
                <span className={styles["legend-ticker"]}>Ticker</span>
                <span className={styles["legend-open"]}>Open Price</span>
                <span className={styles["legend-current"]}>Current Price</span>
                <span className={styles["legend-pc"]}>% Change</span>
            </div>
            {data && Object.keys(data).map((key) => {
                return <TickerDisplay tickerData={extractTickerData({ [key]: data[key] })} />
            })}
            <UserInput dataHandler={handleSetData}/>
        </div>
    )
}