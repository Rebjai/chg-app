import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Utils/UseAuth";
import { useFetch } from "../Utils/useFecth";
function AuthGuard() {
    const fetch = useFetch()
    const { auth } = useAuth()
    useEffect(() => {
        console.log({ auth });

    }, [auth])

    if (auth && auth.user.role =='1' && !auth.user.profile  ) {
        return <Navigate to={'/auth/profile'} />
    }
    return (auth?.user?.id ? <Outlet></Outlet> : <Navigate to={'/auth/login'}></Navigate>);
}

export default AuthGuard;