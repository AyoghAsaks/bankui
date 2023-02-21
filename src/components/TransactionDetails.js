//rafce + Enter
import React, { useContext, useEffect, useState} from 'react';
import AuthContext from "../contexts/AuthContext";
import axios from 'axios';

const TransactionDetails = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  const [transactionDetails, setTransactionDetails] = useState([]);

  let Transaction_Status = ""; //dataType must be "let" since it will be changing with ternary operators.

  //Get's Api from AccountApi: https://localhost:7153/api/Account
  useEffect(() => {
    let tokenData = JSON.parse(localStorage.getItem("token")); //convert's the string in the localStorage to an object.

    let header = {
        "Authorization": `bearer ${tokenData}`
    }
    axios.get(`https://localhost:7153/api/Account/transactionDetails/${user.UserId}`, { headers: header })
        .then((response) => {
            setTransactionDetails(response.data);
            //console.log(response.data);
        });
  }, []);

  return (
    <>
        <div className='body'>
            {transactionDetails.map((transactionDetail) => (
                <div key={user.UserId}>
                    <h4 style={{ marginLeft: "330px"}}>
                        {`Transaction Date: ${transactionDetail.transactionDate}`} <br />
                        {`Account # Transferred From: ${transactionDetail.fromAccountNumber}`} <br />
                        {`Account # Transferred To: ${transactionDetail.toAccountNumber}`} <br />
                        {`Transaction Amount: ${transactionDetail.transactionAmount}`} <br />
                        {`Transaction Status Id: ${transactionDetail.transactionStatusId}`} <br />
                        {`Transaction Status: Completed`} <br />
                    </h4>
                </div>
            ))}
        </div>
    </>
  );
}

export default TransactionDetails;