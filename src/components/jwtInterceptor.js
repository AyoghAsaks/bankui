import axios from "axios";

const jwtInterceptor = axios.create({});

jwtInterceptor.interceptors.request.use((config) => {
    let tokenData = JSON.parse(localStorage.getItem("token")); //convert's the string in the localStorage to an object.
    config.headers.common["Authorization"] = `bearer ${tokenData}`;
    return config;
});

export default jwtInterceptor;
