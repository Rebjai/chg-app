import { createContext, useContext } from "react";
interface Auth{
    auth:{
        user:{id?: string},
    }
    login?: Function
    logout?: Function
}
const AuthContext = createContext<Auth>({auth:{user:{}}, login: undefined, logout: undefined})
const useAuth = () => useContext(AuthContext)
export {AuthContext, useAuth}