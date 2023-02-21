import axios from "axios";

//From BankOrchestratorApi: "https://localhost:7112;http://localhost:5012"

export default axios.create({
    baseURL: "https://localhost:7112/api/BankApplication"
});