import React, {createContext, useState, useEffect, useContext, useLayoutEffect} from 'react';
import {BACKEND} from "../consts";
import {useNavigate} from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user_cache")));

    const fetchMe = ()=>{
        const code = localStorage.getItem("auth_code");
        if(code){
            fetch(`${BACKEND}/user/me`, {headers: {Authorization: "Bearer " + code}}).then(x => {
                if(x.ok) {
                    x.json().then(x => {
                        sessionStorage.setItem("user_cache", JSON.stringify(x));
                        setUser(x);
                    });
                }
                else if(x.status === 404){
                    localStorage.removeItem("auth_code");
                    setUser(null);
                }
            })
        }
        else{
            setUser(null);
        }
    }

    useEffect(() => {
        fetchMe();
    }, []);

    return (
        <UserContext.Provider value={[user, fetchMe]}>
            {children}
        </UserContext.Provider>
    );
};

export const useMe = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useMe must be used within a UserProvider");
    }
    return context;
};