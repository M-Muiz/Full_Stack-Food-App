import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import './LoginPopup.css'
const LoginPopup = ({ setShowLogin }) => {

    const [currentState, setCurrentState] = useState("Login")

    return (
        <div className="login-popup">
            <form className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img src={assets.cross_icon} alt="cross_icon" onClick={() => setShowLogin(false)} />
                </div>
                <div className="login-popup-inputs">
                    {currentState === "Sign Up" ?
                        <input type="text" placeholder='Your Name' required /> : <></>
                    }
                    <input type="email" placeholder='Your Email' required />
                    <input type="password" placeholder='Password' required />
                </div>
                <button>{currentState === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, you agree to our <span>Terms of Service</span> and <span>Privacy Policy</span></p>
                </div>
                {currentState === "Login" ?
                    <p>Create a new account?     <span onClick={() => setCurrentState("Sign Up")}>Click Here</span></p> :
                    <p>Alread'y have an account? <span onClick={() => setCurrentState("Login")}>Log In</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
