import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useRequestHandler from '../hooks/useRequestHandler'
import TickerDisplay from './TickerDisplay'
import styles from './css_modules/StockContent.module.css'
import UserInput from './UserInput'

export default function StockContent() {
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
