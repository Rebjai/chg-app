import { useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Utils/UseAuth";
import { useFetch } from "../../Utils/useFecth";
import { useLocalStorage } from "../../Utils/useLocalStorage";

function AuthProvider({ children }: any) {
    const [auth, setAuth] = useLocalStorage('user', null)
    const [isVerified, setIsVerified] = useState(false)
    
    const fetch = useFetch()
    const navigate = useNavigate();
    const refresh = async () => await fetch.get('/api/auth/profile').then(user => {
        setAuth({ user })
        setIsVerified(true)
        console.log('verified');
    }).catch(err => {
        setAuth(null)
        setIsVerified(false)
        return err
    })
    const login = async (user: any) => {
        setAuth({ user });
        navigate("/", { replace: true });
    };

    // call this function to sign out logged in user
    const logout = () => {
        setAuth(null);
        localStorage.removeItem('token')
        navigate("/", { replace: true });
    };
    const value = useMemo(() => ({ auth, login, logout, refresh, isVerified }), [auth, login, logout, isVerified])
    return (
        <AuthContext.Provider value={value}>
            <Outlet></Outlet>
            {/* {children} */}
        </AuthContext.Provider>
    );
}

export default AuthProvider;