//rafce + Enter
import React, { useRef, useState, useEffect } from 'react';
import "./index.css";
import axios from "./apiRegistration/axios";

const passwordRules =/^[a-zA-Z0-9]*$/; // can have lowercase, uppercase letters, and numbers
const emailRegex =/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const phoneRegExp = /^[0-9][0-9]*$/; //begins with numbers followed by numbers
const nameRegExp = /^[a-zA-Z''-'\s]{2,50}$/; //begins with lowercase or uppercase letter, can have hyphen
const addressRegExp = /^[a-zA-Z0-9' ']*$/; //can have lowercase, uppercase letters, numbers, and spaces
const usernameRegExp = /^[a-zA-Z0-9]*$/;

//From BankOrchestratorApi: "https://localhost:7112/api/BankApplication"
const PROFILE_URL = '/profile';

const Registration = () => {
    //const firstNameRef = useRef();
    //const lastNameRef = useRef();
    //const phoneRef = useRef();
    //const emailRef = useRef();
    //const addressRef = useRef();
    const userNameRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [address, setAddress] = useState('');
    const [validAddress, setValidAddress] = useState(false);
    const [addressFocus, setAddressFocus] = useState(false);

    const [userName, setUserName] = useState('');
    const [validUserName, setValidUserName] = useState(false);
    const [userNameFocus, setUserNameFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userNameRef.current.focus();
    }, [])

    useEffect(() => {
        const res = nameRegExp.test(firstName);
        console.log(res);
        console.log(firstName);
        setValidFirstName(res);
    }, [firstName])

    useEffect(() => {
        const res = nameRegExp.test(lastName);
        console.log(res);
        console.log(lastName);
        setValidLastName(res);
    }, [lastName])

    useEffect(() => {
        const res = phoneRegExp.test(phone);
        console.log(res);
        console.log(phone);
        setValidPhone(res);
    }, [phone])

    useEffect(() => {
        const res = emailRegex.test(email);
        console.log(res);
        console.log(email);
        setValidEmail(res);
    }, [email])

    useEffect(() => {
        const res = addressRegExp.test(address);
        console.log(res);
        console.log(address);
        setValidAddress(res);
    }, [address])

    useEffect(() => {
        const res = usernameRegExp.test(userName);
        console.log(res);
        console.log(userName);
        setValidUserName(res);
    }, [userName])

    useEffect(() => {
        const res = passwordRules.test(password);
        console.log(res);
        console.log(password);
        setValidPassword(res);
        const match = password === confirmPassword;
        setValidConfirmPassword(match);
    }, [password, confirmPassword])

    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, phone, email, address, userName, password, confirmPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = nameRegExp.test(firstName);
        const v2 = nameRegExp.test(lastName);
        const v3 = phoneRegExp.test(phone);
        const v4 = emailRegex.test(email);
        const v5 = addressRegExp.test(address);
        const v6 = usernameRegExp.test(userName);
        const v7 = passwordRules.test(password);
        if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6 || !v7) {
            setErrMsg("Invalid Entry");
            return;
        }
        console.log(firstName, lastName, email, phone, address, password);
        setSuccess(true);

        try {
            const response = await axios.post(PROFILE_URL,
                JSON.stringify({ "firstName": firstName, "lastName": lastName, "phone": phone, "email": email, "address": address, "userName": userName, "password": password }),
                {
                    headers: { 'Content-Type': 'application/json' }
                    // withCredentials: true
                }
            );
            console.log(response.data);
            setSuccess(true);
        } catch(err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            }
            else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            }
            else {
                setErrMsg('Registration Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href='/login' style={{ textDecoration: "none" }}>Login</a>
                    </p>
                </section>
            ) : (
                <div className='body'>
                    <p ref={errRef} className={errMsg ? "errmsg" :
                        "offscreen"} aria-live="assertive"
                    >
                        How are you doing today{errMsg}
                    </p>

                    <h1>Sign Up</h1>

                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className='container'>
                            <div className='wrapper'>

                                <label htmlFor='firstName'>
                                    First Name:
                                    <span className={validFirstName ? "valid" : "hide"}>
                                        {/*<FontAwesomeIcon icon={faCheck} />*/}
                                    </span>
                                    <span className={validFirstName || !firstName ? "hide" :
                                        "invalid"}>
                                            {/*<FontAwesomeIcon icon={faTimes} />*/}
                                    </span>
                                </label>
                                <input
                                    className='wrapper-1'
                                    type="text"
                                    id='firstName'
                                    autoComplete='off'
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={firstName}
                                    required
                                    aria-invalid={validFirstName ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setFirstNameFocus(true)}
                                    onBlur={() => setFirstNameFocus(false)}
                                    size="35"
                                />
                                <p id='uidnote' className={firstNameFocus && firstName && !validFirstName ? "instructions" : "offscreen"}>
                                    Only two or more alphanumeric characters allowed
                                </p>

                                <label htmlFor='lastName'>
                                    Last Name:
                                </label>
                                <input
                                    className='wrapper-1'
                                    type="text"
                                    id='lastName'
                                    autoComplete='off'
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastName}
                                    required
                                    aria-invalid={validLastName ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setLastNameFocus(true)}
                                    onBlur={() => setLastNameFocus(false)}
                                    size="35"
                                />
                                <p id='uidnote' className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}>
                                    Only two or more alphanumeric characters allowed
                                </p>

                                <label htmlFor='phone'>
                                    Phone:
                                </label>
                                <input
                                    className='wrapper-1'
                                    type="phone"
                                    id='phone'
                                    autoComplete='off'
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                    required
                                    aria-invalid={validPhone ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setPhoneFocus(true)}
                                    onBlur={() => setPhoneFocus(false)}
                                    size="35"
                                />
                                <p id='uidnote' className={phoneFocus && phone && !validPhone ? "instructions" : "offscreen"}>
                                    Only ten numbers allowed
                                </p>

                                <label htmlFor='email'>
                                    Email:
                                </label>
                                <input
                                    className='wrapper-1'
                                    type="email"
                                    id='email'
                                    autoComplete='off'
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                    size="35"
                                />
                                <p id='uidnote' className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                    Must have the special characters @ and .
                                </p>
                            </div>
                            <div className='wrapper'>
                                <label htmlFor='address'>
                                    Address:
                                </label>
                                <input
                                    className='wrapper-1'
                                    type="text"
                                    id='address'
                                    autoComplete='off'
                                    onChange={(e) => setAddress(e.target.value)}
                                    value={address}
                                    required
                                    aria-invalid={validAddress ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setAddressFocus(true)}
                                    onBlur={() => setAddressFocus(false)}
                                    size="35"
                                />
                                <p id='uidnote' className={addressFocus && address && !validAddress ? "instructions" : "offscreen"}>
                                    Only alphanumeric characters allowed
                                </p>

                                <label htmlFor='userName'>
                                    Username:
                                </label>
                                <input
                                    className='wrapper-1'
                                    type="text"
                                    id='userName'
                                    ref={userNameRef}
                                    autoComplete='off'
                                    onChange={(e) => setUserName(e.target.value)}
                                    value={userName}
                                    required
                                    aria-invalid={validUserName ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setUserNameFocus(true)}
                                    onBlur={() => setUserNameFocus(false)}
                                    size="35"
                                />
                                <p id='uidnote' className={userNameFocus && userName && !validUserName ? "instructions" : "offscreen"}>
                                    Only alphanumeric characters allowed
                                </p>

                                <label htmlFor='password'>
                                    Password:
                                </label>
                                <input
                                    className='wrapper-1'
                                    type="password"
                                    id='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                    aria-invalid={validPassword ? "false" : "true"}
                                    aria-describedby="passwordnote"
                                    onFocus={() => setPasswordFocus(true)}
                                    onBlur={() => setPasswordFocus(false)}
                                    size="35"
                                />
                                <p id='passwordnote' className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                                    Only alphanumeric characters allowed
                                </p>

                                <label htmlFor='confirmPassword'>
                                    Confirm Password:
                                </label>
                                <input
                                    className='wrapper-1'
                                    type="password"
                                    id='confirmPassword'
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                    required
                                    aria-invalid={validConfirmPassword ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setConfirmPasswordFocus(true)}
                                    onBlur={() => setConfirmPasswordFocus(false)}
                                    size="35"
                                />
                                <p id='confirmnote' className={confirmPasswordFocus && !validConfirmPassword ? "instructions" : "offscreen"}>
                                    Must match the previous password
                                </p>

                            </div>
                        </div>

                        <div className='btn'>
                            <button
                                type='submit'
                                disabled={!validFirstName || !validLastName || !validEmail || !validPhone || !validAddress || !validUserName || !validPassword || !validConfirmPassword ? true : false}
                            >
                                Sign Up
                            </button>
                        </div>
                        <div></div>
                    </form>

                    <p className='signin'>
                        Already have an account? {" "}
                        <span>
                            {/*put router link here*/}
                            <a href="/login" style={{ textDecoration: "none" }}>Login</a>
                        </span>
                    </p>
                </div>
            )}
        </>
    );
}

export default Registration;
