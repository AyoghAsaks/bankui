import { React, createContext, useState } from "react";
import axios from "../components/apilogin/axios";
import jwt_decode from "jwt-decode";

const LOGIN_URL = '/login';

const AuthContext = createContext(); //the context is called "AuthContext"

export const AuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    //We use [user, setUser] = useState(null) to get access to the users data
    const [user, setUser] = useState(() => {
        if(localStorage.getItem("token")) {
            let tokenData = JSON.parse(localStorage.getItem("token")); //convert's "token" string to an object
            let accessToken = jwt_decode(tokenData);
            return accessToken;
        }
        return null;
    });

    const login = async(payload) => {
        const apiResponse = await axios.post(
            LOGIN_URL,
            payload
        );
        let accessToken = jwt_decode(apiResponse.data);
        console.log(accessToken);

        setUser(accessToken);
        localStorage.setItem("token", JSON.stringify(apiResponse.data)); //convert's "token" object to a string
    };

    return (
        <AuthContext.Provider value={{
            auth, setAuth,
            login, user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;