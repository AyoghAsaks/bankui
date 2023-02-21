import axios from "axios";

//This is the AccountApi Service: "https://localhost:7153;http://localhost:5070"

export default axios.create({
    baseURL: "https://localhost:7153/api/Account"
});
