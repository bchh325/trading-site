import React from 'react'
import styles from './css_modules/TickerDisplay.module.css'

export default function TickerDisplay({ tickerData }) {

    const modifyPercentage = (percentChange) => {
        const sign = percentChange < 0 ? "-" : "+"
        return sign + String(Math.round(Math.abs(percentChange) * 100) / 100) + "%"
    }

    const formatToUsd = (amount) => {
        return amount.toLocaleString("en-US", {style:"currency", currency:"USD"});
    }

    const checkPercentSign = () => {
        return tickerData.percentChange < 0 ? styles["percent-red"] : styles["percent-green"]
    }

    return (
        <div className={styles.container}>
            <span className={styles["ticker-symbol"]}>{tickerData.tickerSymbol}</span>
            <span className={styles["open-price"]}>{formatToUsd(tickerData.openPrice)}</span>
            <span className={styles["current-price"]}>{formatToUsd(tickerData.currentPrice)}</span>
            <span className={`${styles["percent-change"]} ${checkPercentSign()}`}>{modifyPercentage(tickerData.percentChange)}</span>
        </div>
    )
}
