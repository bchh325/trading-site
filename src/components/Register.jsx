import { Auth } from 'aws-amplify';
import React, { useState } from 'react'
import { notification, Modal } from 'antd';
import styles from './css_modules/Register.module.css'

export default function Register() {

    const [isModalOpen, setIsModalOpen] = useState(false)
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

    const handleConfirm = async (e) => {
        //console.log("confirm")
        e.preventDefault()
        try {
            await Auth.confirmSignUp(userInfo.uname, userInfo.confirm)
            notification.success({
                message: 'Verification successful',
                description: 'Sign in and head to Stock Content',
                placement: 'top',
                duration: 2.5
            })
            setIsModalOpen(false)
            setUserInfo({
                uname: "",
                pass: "",
                email: "",
                confirm: ""
            })
        } catch (err) {
            //console.log(err)
            notification.error({
                message: 'Verification Failed',
                description: 'Double check your confirmation code',
                placement: 'top',
                duration: 1.8
            })
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        localStorage.clear()
        //console.log(userInfo)
        try {
            await Auth.signUp({
                username: userInfo.uname,
                password: userInfo.pass,

                attributes: {
                    email: userInfo.email
                }
            })
                .then(() => {
                    //console.log("success")
                    setUserInfo({
                        ...userInfo,
                        confirm: ""
                    })
                    setIsModalOpen(true)
                })
        } catch (err) {
            notification.error({
                message: 'Registration Failed',
                description: err.message,
                placement: 'top',
                duration: 2.5
            })
            console.log(Object.getOwnPropertyNames(err))
            console.log(err.message)
        }
    }

    return (
        <div className={styles["register-container"]}>
            <span className={styles["register-label"]}>Register</span>
            <div className="">
                <form onSubmit={handleSubmit} autoComplete="off" >
                    <Modal open={isModalOpen} onOk={handleConfirm} onCancel={() => { setIsModalOpen(false) }} footer={null}>
                        <div className={styles["group"]}>
                            <input className={styles["user-input"]} type="number" name="confirm" value={userInfo.confirm} onChange={handleInfo} required />
                            <span className={styles.highlight}></span>
                            <span className={styles.bar}></span>
                            <label className={styles.label}>Confirmation Code</label>
                        </div>
                        <button onClick={handleConfirm} className={styles.submit}><span>Confirm</span></button>
                    </Modal>
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
