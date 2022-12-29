import { Auth } from 'aws-amplify';
import React, { useState } from 'react'
import { notification } from 'antd';
import jwtDecode from 'jwt-decode';

export default function Login() {

    const [userInfo, setUserInfo] = useState(
        {
            uname: "",
            pass: ""
        }
    )


    const handleInfo = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        })
    }

    const handleLogin = (e) => {
        e.preventDefault()
        console.log(userInfo)

        Auth.signIn({
            username: userInfo.uname,
            password: userInfo.pass
        })
            .then((user) => {
                notification.success({
                    message: 'Succesfully Logged In!',
                    description: 'Login has been successful, redirecting...',
                    placement: 'top',
                    duration: 2
                })

                console.log(user.signInUserSession)
                console.log(user)
                localStorage.setItem("AUTH_KEY", user.signInUserSession.accessToken.jwtToken)
                localStorage.setItem("USERNAME", user.username)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="">
            Login
            <div className="">
                <form onSubmit={handleLogin}>
                    <div className="input-container">
                        <label>Username </label>
                        <input type="text" name="uname" value={userInfo.uname} onChange={handleInfo} required />
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="pass" value={userInfo.pass} onChange={handleInfo} required />
                    </div>
                    <div className="button-container">
                        <input type="submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}
