//rafce + Enter

import React, { useState, useEffect } from 'react';
import axios from "../apiGetAccount/axios";
import { useContext } from 'react';
import AuthContext from "../contexts/AuthContext";

import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const [accounts, setAccounts] = useState([]);

    //Get UserID from BankApplicationApi
    useEffect(() => {
        let tokenData = JSON.parse(localStorage.getItem("token")); //convert's the string in the localStorage to an object.

        let header = {
            "Authorization": `bearer ${tokenData}`
        }
        axios.get(`https://localhost:7112/api/BankApplication/account/${user.UserId}`, { headers: header })
            .then((response) => {
                setAccounts(response.data);
                console.log(response.data);
            });
    }, []);

  return (
    <>
        <div className='body'>
            {accounts.map((account) => (
                <div key={user.UserId}>
                    <h4 style={{ marginLeft: "330px" }}>
                        {`First Name: ${user.FirstName}`} <br />
                        {`Balance: ${account.balance}`} <br />
                        {`Account Number: ${account.accountNumber}`}
                    </h4>
                </div>
            ))}

            <div className='btn'>
                <button
                    type="button"
                    onClick={() => {
                        navigate("/transactiondetails");
                    }}
                >
                    Transfer Details
                </button>
            </div>
        </div>
    </>
  );
};

export default Dashboard;
