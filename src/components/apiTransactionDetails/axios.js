import axios from "axios";

//From AccountApi: "https://localhost:7153;http://localhost:5070"

const accessToken = "";

export default axios.create({
    baseURL: "https://localhost:7153/api/Account",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
    }
});
