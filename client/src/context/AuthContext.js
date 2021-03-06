import { createContext } from "react";

const AuthContext = createContext({
    token:null,
    userId:null,
    login:()=>{},
    logout:()=>{},
    isAuth:false
});

export default AuthContext;