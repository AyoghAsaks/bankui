//rafce + Enter
import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./index.css";

//import "useContext" below:
import { useContext } from 'react';
//import "AuthContext" below:
import AuthContext from "../contexts/AuthContext";

const JWT_ISSUER = "JWTAuthenticationServer";
const JWT_AUDIENCE = "JWTServicePostmanClient";
const JWT_SUBJECT = "JWTServiceAccessToken";

const Login = () => {
    const navigate = useNavigate();

    //We get the fields "sethAuth" and "values" from the Context we named "AuthContext"
    //const { setAuth } = useContext(AuthContext);

    const userNameRef = useRef();
    const errRef = useRef();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userNameRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [userName, password])

    const { login } = useContext(AuthContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        let payload = {
            "username": userName,
            "password": password,
            "jwTIssuer": JWT_ISSUER,
            "jwTAudience": JWT_AUDIENCE,
            "jwTSubject": JWT_SUBJECT
        };
        await login(payload);

        setUserName(''); //Resets userName to empty string after submit button is clicked.
        setPassword(''); //Resets password to empty string after submit button is clicked.

        navigate('/dashboard');
    };

  return (
    <>
        <div className='body'>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                How are you doing!!!{errMsg}
            </p>

            <h1>Sign In</h1>

            <form onSubmit={handleSubmit}>
                <div className='container-1'>
                    <div className='wrapper'>
                        <label htmlFor='userName'>Username:</label>
                        <input 
                            className='container-12'
                            type="text"
                            id="userName"
                            ref={userNameRef}
                            autoComplete="off"
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                            required
                            size="80"
                            styles={{ padding: "8px" }}
                        />
                    </div>

                    <div className='wrapper'>
                        <label htmlFor='password'>Password:</label>
                        <input 
                            className='container-13'
                            type="password"
                            id='password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            size="80"
                            style={{ padding: "8px" }}
                        />
                    </div>
                </div>

                <div className='btn'>
                    <button type='submit'>Sign In</button>
                </div>
            </form>
            <p>
                Don't have an Account? {" "}
                <span className='line'>
                    {/*Put router link here*/}
                    <a href='/registration' styles={{ textDecoration: "none", padding: "8px"}}>Sign Up</a>
                </span>
            </p>
        </div>
    </>
  )
}

export default Login;