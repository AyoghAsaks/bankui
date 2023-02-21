//rafce + Enter
import { React, useContext, useEffect, useState, useRef } from 'react';
import AuthContext from "../contexts/AuthContext";
import axios from 'axios';
import { json } from 'react-router-dom';

const Transfer = () => {
  const currencyRegex = /^[0-9]+\.[0-9]{2}$/;
  const numbersOnlyRegex = /^[0-9]*$/;
  
  const BANKTRANSFER_URL = '/transfer';

  const { user } = useContext(AuthContext);

  const errRef = useRef();

  const [fromAccount, setFromAccount] = useState('');
  const [validFromAccount, setValidFromAccount] = useState(false);
  const [fromAccountFocus, setFromAccountFocus] = useState(false);

  const [toAccount, setToAccount] = useState('');
  const [validToAccount, setValidToAccount] = useState(false);
  const [toAccountFocus, setToAccountFocus] = useState(false);

  const [transactionAmount, setTransactionAmount] = useState('');
  const [validTransactionAmount, setValidTransactionAmount] = useState(false);
  const [transactionAmountFocus, setTransactionAmountFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const res = numbersOnlyRegex.test(fromAccount);
    console.log(res);
    console.log(fromAccount);
    setValidFromAccount(res);
  }, [fromAccount])

  useEffect(() => {
    const res = numbersOnlyRegex.test(toAccount);
    console.log(res);
    console.log(toAccount);
    setValidToAccount(res);
  }, [toAccount])

  useEffect(() => {
    const res = currencyRegex.test(transactionAmount);
    console.log(res);
    console.log(transactionAmount);
    setValidTransactionAmount(res);
  }, [transactionAmount])

  useEffect(() => {
    setErrMsg('');
  }, [fromAccount, toAccount, transactionAmount])


  //Get's Api from AccountApi: https://localhost:7153/api/Account
  const handleSubmit = (e) => {
    e.preventDefault();

    let tokenData = JSON.parse(localStorage.getItem("token")); //convert's the string in the localStorage to an object.

    var payload = {
        "fromAccount": fromAccount,
        "toAccount": toAccount,
        "transactionAmount": transactionAmount
    }

    axios
        .post("https://localhost:7153/api/Account/transfer", payload,
            {
                headers: {
                    'Authorization': `bearer ${tokenData}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        .then((response) => {
            console.log(response);
            console.log(response.data);
            setSuccess(true);
        })
        .catch((err) => {
            console.log(err.response);
            setErrMsg(err.response);
        });
  }

  return (
    <>
        {success ? (
            <section>
                <h1 style={{ textDecoration: "none" }}>Success!</h1>
                <p>
                    Click on the link shown by the arrow &rarr; &nbsp;<a href="/transactiondetails" style={{ textDecoration: "none"}}>Transaction Details</a>
                </p>
            </section>
        ) : (
            <div className='body'>
                <p ref={errRef} className={errMsg ? "errmsg" :
                    "offscreen"} aria-live="assertive"
                >
                    {errMsg}
                </p>

                <h1>Transfer Funds</h1>
                <h4>Sender's Acct #: <span>{user.UserId}</span></h4>
                <h4>First Name: <span>{user.FirstName}</span></h4>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className='container-1'>
                        <div className='wrapper-t'>
                            <label htmlFor='fromAccount'>Sender's Account #:</label>
                            <input
                                className='wrapper-1'
                                type="text"
                                id='fromAccount'
                                autoComplete='off'
                                onChange={(e) => setFromAccount(e.target.value)}
                                value={fromAccount}
                                required
                                aria-invalid={validFromAccount ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setFromAccountFocus(true)}
                                onBlur={() => setFromAccountFocus(false)}
                                size="87"
                                style={{ padding: "8px" }}
                            />
                            <p id='uidnote' className={fromAccountFocus && fromAccount && !validFromAccount ? "instructions" : "offscreen"}>
                                Only numbers are allowed
                            </p>

                            <label htmlFor='toAccount'>Receiver's Account #:</label>
                            <input
                                className='wrapper-1'
                                type="text"
                                id='toAccount'
                                autoComplete='off'
                                onChange={(e) => setToAccount(e.target.value)}
                                value={toAccount}
                                required
                                aria-invalid={validToAccount ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setToAccountFocus(true)}
                                onBlur={() => setToAccountFocus(false)}
                                size="87"
                                style={{ padding: "8px" }}
                            />
                            <p id='uidnote' className={toAccountFocus && toAccount && !validToAccount ? "instructions" : "offscreen"}>
                                Only numbers are allowed
                            </p>

                            <label htmlFor='transactionAmount'>Amount:</label>
                            <input
                                className='wrapper-1'
                                type="text"
                                id='transactionAmount'
                                autoComplete='off'
                                onChange={(e) => setTransactionAmount(e.target.value)}
                                value={transactionAmount}
                                required
                                aria-invalid={validTransactionAmount ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setTransactionAmountFocus(true)}
                                onBlur={() => setTransactionAmountFocus(false)}
                                size="87"
                                style={{ padding: "8px" }}
                            />
                            <p id='uidnote' className={transactionAmountFocus && transactionAmount && !validTransactionAmount? "instructions" : "offscreen"}>
                                Enter amount in dollars and cents, e.g., $100 should be 100.00
                            </p>
                        </div>
                    </div>

                    <div className='btn'>
                        <button type='submit'>Transfer</button>
                    </div>
                    <div></div>
                </form>

                <p className='signin'>
                    Already Performed Transfer? {" "}
                    <span className='line'> 
                        {/*put router link here*/}
                        <a href='/transactiondetails' style={{ textDecoration: "none"}}>Transaction Details</a>
                    </span>
                </p>
            </div>
        )}
    </>
  );
}

export default Transfer;