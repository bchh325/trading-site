import { Auth } from 'aws-amplify';
import React, { useState } from 'react'
import { notification } from 'antd';
import styles from './css_modules/Register.module.css'

export default function Register() {

    const [userInfo, setUserInfo] = useState(
        {
            uname: "",
            pass: "",
            email: "",
            confirm: ""
        }
    )

    const handleInfo = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        })
    }

    const handleConfirm = (e) => {
        e.preventDefault()
        console.log(userInfo
            .confirm)
        try {
            Auth.confirmSignUp(userInfo.uname, userInfo.confirm)
            notification.success({
                message: 'Verification successful',
                description: 'Sign In at the Home tab and head to Stock Content',
                placement: 'top',
                duration: 1.5
            })
        } catch (err) {
            console.log(err)
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.clear()
        console.log(userInfo)

        Auth.signUp({
            username: userInfo.uname,
            password: userInfo.pass,

            attributes: {
                email: userInfo.email
            }
        })
            .then(() => {
                console.log("success")
                notification.success({
                    message: 'Succesfully signed up user!',
                    description: 'Account created successfully. Submit your verification code and Sign In.',
                    placement: 'top',
                    duration: 1.5
                })
            })
    }

    return (
        // <div className="">
        //     <div className="">
        //         <form onSubmit={handleSubmit}>
        //             <div className="input-container">
        //                 <label>Email </label>
        //                 <input type="email" name="email" value={userInfo.email} onChange={handleInfo} required />
        //             </div>
        //             <div className="input-container">
        //                 <label>Username </label>
        //                 <input type="text" name="uname" value={userInfo.uname} onChange={handleInfo} required />
        //             </div>
        //             <div className="input-container">
        //                 <label>Password </label>
        //                 <input type="password" name="pass" value={userInfo.pass} onChange={handleInfo} required />
        //             </div>
        //             <div className="button-container">
        //                 <input type="submit" />
        //             </div>
        //         </form>
        //         <br />
        //         <form onSubmit={handleConfirm}>
        //             <div className="input-container">
        //                 <label>Confirm Code </label>
        //                 <input type="number" name="confirm" value={userInfo.confirm} onChange={handleInfo} required />
        //             </div>
        //             <div className="button-container">
        //                 <input type="submit" />
        //             </div>
        //         </form>
        //     </div>
        // </div>
        <div className={styles["register-container"]}>
            <span className={styles["register-label"]}>Register</span>
            <div className="">
                <form onSubmit={handleSubmit} autoComplete="off" >
                    <div className={styles["group"]}>
                        <input className={styles["user-input"]} type="email" name="email" value={userInfo.email} onChange={handleInfo} required />
                        <span className={styles.highlight}></span>
                        <span className={styles.bar}></span>
                        <label className={styles.label}>Email</label>
                    </div>
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
                    <button type="submit" className={styles.submit}><span>Register</span></button>
                </form>
            </div>
        </div>
    )
}