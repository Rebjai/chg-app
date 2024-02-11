import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Utils/UseAuth";
import { useFetch } from "../Utils/useFecth";
function AuthGuard() {
    const fetch = useFetch()
    const { auth, isVerified, refresh } = useAuth()
    // useEffect(() => {
    //     console.log({ auth });

    // }, [auth])
    useEffect(() => {
        async function fetchData() {
            console.log({ auth });
            if (!isVerified && !!auth) {
                await refresh!();
            }
        }
        fetchData();
    }, [auth, isVerified, refresh]);
    

    if (!auth) {
        return <Navigate to={'/auth/login'}></Navigate>
    }
    if (auth.user && auth.user.role =='1' && !auth.user.profile  ) {
        return <Navigate to={'/auth/profile'} />
    }
    console.log('authenticated');
    return (auth?.user?.id ? <Outlet></Outlet> : <Navigate to={'/auth/login'}></Navigate>);
}

export default AuthGuard;