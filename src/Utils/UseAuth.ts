import { createContext, useContext } from "react";
import Staff from "../Interfaces/staff.interface";
interface Auth{
    auth:{
        user:{id?: number, name?:string, first_surname?: string, second_surname?:string, role?: string, profile?: Staff},
    }
    login?: Function
    logout?: Function
    refresh?: Function,
    isVerified: boolean
}
const AuthContext = createContext<Auth>({auth:{user:{}}, login: undefined, logout: undefined, refresh: undefined, isVerified: false})
const useAuth = () => useContext(AuthContext)
export {AuthContext, useAuth}