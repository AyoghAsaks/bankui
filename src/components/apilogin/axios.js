import axios from "axios";

//From AuthApi: https://localhost:7132;http://localhost:5042"

export default axios.create({
    baseURL: 'https://localhost:7132/api/token'
});