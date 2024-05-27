import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './LoginPopup.css'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import { toast } from "react-toastify"

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);
    

    const [currentState, setCurrentState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };




    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currentState === "Login") {
            newUrl += "api/user/login";
        } else {
            newUrl += "api/user/register";
        }

        const res = await axios.post(newUrl, data);
        console.log(res.data.message)
        if (res.data.success) {
            setToken(res.data.token)
            localStorage.setItem("token", res.data.token)
            setShowLogin(false);
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message)
        }
    };




    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img src={assets.cross_icon} alt="cross_icon" onClick={() => setShowLogin(false)} />
                </div>
                <div className="login-popup-inputs">
                    {currentState === "Sign Up" ?
                        <input onChange={onChangeHandler} name="name" value={data.name} type="text" placeholder='Your Name' required /> : <></>
                    }
                    <input onChange={onChangeHandler} name="email" value={data.email} type="email" placeholder='Your Email' required />
                    <input onChange={onChangeHandler} name="password" value={data.password} type="password" placeholder='Password' required />
                </div>
                <button type='submit'>{currentState === "Sign Up" ? "Create Account" : "Login"}</button>
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
