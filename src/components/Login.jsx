import { Auth } from 'aws-amplify';
import React, { useState } from 'react'
import { notification } from 'antd';
import styles from './css_modules/Login.module.css'

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
        localStorage.clear()
        Auth.signIn({
            username: userInfo.uname,
            password: userInfo.pass
        })
            .then((user) => {
                notification.success({
                    message: 'Succesfully Signed In!',
                    description: 'Click on Stock Content to view ticker data',
                    placement: 'top',
                    duration: 2
                })

                console.log(user.signInUserSession)
                console.log(user)
                localStorage.setItem("AUTH_KEY", user.signInUserSession.accessToken.jwtToken)
                localStorage.setItem("USERNAME", user.username)
                localStorage.setItem("IS_AUTHENTICATED", JSON.stringify(true))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleGuest = async () => {
        let anonymousUser
        localStorage.clear()
        Auth.signOut()
        console.log("Guest Handler")
        try {
            anonymousUser = await Auth.currentCredentials()
            localStorage.setItem("IS_AUTHENTICATED", JSON.stringify(false))
            notification.success({
                message: 'Succesfully got guest credentials',
                description: 'Guests will not be able to save ticker data, but will still have access to displaying inputted data in Stock Content.',
                placement: 'top',
                duration: 3
            })
        } catch (err) {
            console.log(err)
        }
        console.log(anonymousUser)
    }

    const handleSignOut = async () => {
        try {
            await Auth.signOut();
            localStorage.clear()
            notification.success({
                message: 'Succesfully Signed Out!',
                description: 'Continue as usual...',
                placement: 'top',
                duration: 1.5
            })
            localStorage.setItem("IS_AUTHENTICATED", JSON.stringify(null))
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
        <div className={styles["login-container"]}>
            <span className={styles["login-label"]}>Sign In</span>
            <div className="">
                <form onSubmit={handleLogin} autoComplete="off" >
                    <div className={styles["group"]}>
                        <input className={styles["user-input"]} type="text" name="uname" value={userInfo.uname} onChange={handleInfo} required />
                        <span className={styles.highlight}></span>
                        <span className={styles.bar}></span>
                        <label className={styles.label}>Username</label>
                    </div>
                    <div className={styles["group"]}>
                        <input className={styles["user-input"]} type="password" name="pass" value={userInfo.pass} onChange={handleInfo} required />
                        <span className={styles.highlight}></span>
                        <span className={styles.bar}></span>
                        <label className={styles.label}>Password</label>
                    </div>
                    <button type="submit" className={styles.submit}><span>Sign In</span></button>
                </form>
                <div className={styles["button-container"]}>
                    <button className={`${styles.submit} ${styles["guest-button"]}`} onClick={handleGuest}><span>Continue as Guest</span></button>
                </div>
            </div>
        </div>
    )
}
