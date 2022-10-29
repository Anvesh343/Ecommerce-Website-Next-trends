import {useState} from 'react'
// import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

import './logingform.css'

const LoginForm = ()=> {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErroeMsg] = useState('')
    const [showSubmitError, setShowSubmitError] = useState(false)

    const history = useNavigate();

    const OnSubmiteSucess = (jwtToken) => {

        Cookies.set('jwt_token', jwtToken, {
            expires: 30,
        })
        history('/')
    }

    const onSubmiteFailure = (error) => {
        setShowSubmitError(true)
        setErroeMsg(error)
    }

    const submitForm = async(e) => {
       
        e.preventDefault()

        const userDetails = {username,password}
       const url = 'https://apis.ccbp.in/login'
        const Options = {
            method: 'POST',
            body: JSON.stringify(userDetails),
        }

        const res = await fetch(url, Options)

        const data = await res.json()

        res.ok ?  OnSubmiteSucess(data.jwt_token) : onSubmiteFailure(data.error_msg)
    }


    const renderPasswordField = () => {

        return (
            <>
                <label className="input-label" htmlFor="password">
                PASSWORD
                </label>
                <input
                type="text"
                id="password"
                className="password-input-field"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                />
            </>
        )

    }


    const renderUsernameField = () => {

        return (

            <>
            <label className="input-label" htmlFor="username">
            USERNAME
            </label>
            <input
            type="text"
            id="username"
            className="username-input-field"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            />
        </>
        )
        
    }

    return (
        <div className="login-form-container">
            <img 
                src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png' 
                alt="website logo"
                className="login-website-logo-mobile-img"
            />
            <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
                className="login-img"
                alt="website login"
            />
            <form className="form-container" onSubmit={submitForm}>
            <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                className="login-website-logo-desktop-img"
                alt="website logo"
          />    
          <div className="input-container">{renderUsernameField()}</div>
          <div className="input-container">{renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>     
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            </form>
        </div>
    )
}

export default LoginForm