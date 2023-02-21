import axios from "axios";

//https://localhost:7112

const accessToken = "";

export default axios.create({
    baseURL: "https://localhost:7112/api/BankApplication",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
    }
});