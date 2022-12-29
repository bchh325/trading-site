import axios from 'axios'
import React from 'react'

export default function APITest() {

    const sampleData = {
        username: "testUsername",
        id: "testID4"
    }
    let handleRequest = async () => {
        let AUTH_KEY = localStorage.getItem("AUTH_KEY")
        if (AUTH_KEY !== null) {
            let request = {
                host: '	https://qlqwl50g1d.execute-api.us-west-1.amazonaws.com',
                method: 'GET',
                url: '	https://qlqwl50g1d.execute-api.us-west-1.amazonaws.com/user/tickers',
                path: 'user/tickers',
                params: {
                    username: "testUsername",
                    id: "testID4"
                },
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                    'Authorization': AUTH_KEY
                }
            }

            const response = await axios(request)
            console.log(response)
        } else {
            alert('AUTH_KEY invalid')
        }
    }

    return (
        <div onClick={handleRequest}>APITest</div>
    )
}
