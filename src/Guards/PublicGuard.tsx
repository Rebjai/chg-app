import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Utils/UseAuth";
import { useFetch } from "../Utils/useFecth";
function PublicGuard() {
    const fetch = useFetch()
    const { auth } = useAuth()
    useEffect(() => {
        console.log({ auth });

    }, [auth])
    const location = useLocation()
    if (!auth) {
        console.log('no auth');
        return <Outlet></Outlet>
    }
    console.log({ location });
    
    if (auth?.user && auth.user.role == '1' && !auth.user.profile && location.pathname !== '/auth/profile') {
        console.log('to profile');
        return <Navigate to={'/auth/profile'}></Navigate>
    }
    // this good
    if (auth?.user && auth.user.role != '10' && location.pathname == '/auth/profile') {
        console.log('profile');

        return <Outlet></Outlet>
    }
    if (!auth && location.pathname == '/auth/profile'){
        console.log('no account');
        
        return <Navigate to={'/'}></Navigate>
    }
    return (!auth?.user?.id ? <Outlet></Outlet> : <Navigate to={'/'}></Navigate>);
}

export default PublicGuard;