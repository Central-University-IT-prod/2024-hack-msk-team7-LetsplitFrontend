import {useNavigate} from "react-router-dom";
import {useMe} from "./Components/UserProvider";

export function useAuth(saveState = null){
    const navigate = useNavigate();

    const [me,fetchMe] = useMe();

    return [
        (saveState = null, success = null)=>getAuth(navigate, saveState, success),
        (location = "/")=>{onAuth(navigate, location); fetchMe()}
    ];
}

function getAuth(navigate,saveState,success){
    const code = getToken();
    if(code){
        if(success){
            success(code);
        }
        return code;
    }
    else{
        if(saveState){
            saveState();
        }
        sessionStorage.setItem("auth_referer", window.location.pathname);
        navigate("/login");
        return null;
    }
}

function onAuth(navigate, second){
    const ref = sessionStorage.getItem("auth_referer");
    if(ref){
        navigate(ref);
    }
    else{
        navigate(second);
    }
}

function getToken(){
    return localStorage.getItem("auth_code");
}