import { useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Utils/UseAuth";
import { useLocalStorage } from "../../Utils/useLocalStorage";

function AuthProvider({ children }: any) {
    const [auth, setAuth] = useLocalStorage('user', null)
    const navigate = useNavigate();
    const login = async (user: any) => {

        console.log('setting user');
        setAuth({user});
        
        navigate("/profile");
    };

    // call this function to sign out logged in user
    const logout = () => {
        setAuth(null);
        navigate("/", { replace: true });
    };
    const value = useMemo(() => ({ auth, login, logout }), [auth, login, logout])
    return (
        <AuthContext.Provider value={value}>
            <Outlet></Outlet>
            {/* {children} */}
        </AuthContext.Provider>
    );
}

export default AuthProvider;