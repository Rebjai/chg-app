import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Utils/UseAuth";
import { useFetch } from "../Utils/useFecth";
function PublicGuard() {
    const fetch = useFetch()
    const { auth } = useAuth()
    useEffect(() => {
        console.log({ auth });

    }, [auth])
    return (!auth?.user?.id ? <Outlet></Outlet> : <Navigate to={'/'}></Navigate>);
}

export default PublicGuard;