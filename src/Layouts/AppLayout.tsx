import { Suspense } from "react";
import { Link, Outlet, useNavigation } from "react-router-dom";
import chgLogo from '../assets/chg-app.svg'

function AppLayout() {
    const pageTitle = location.pathname.slice(1);
    const navigation = useNavigation()

    return (
        <div className="App">
            <header className="flex flex-col justify-center items-center gap-5">

                <Link to={'/'} className="max-w-[100px] w-2/12" ><img src={chgLogo} className="w-full" alt="CHG APP logo" /></Link>

                <h2 className="text-2xl font-bold text-purple-700 mx-4 mb-6">{!!pageTitle ? pageTitle : 'CHG-APP'}</h2>
            </header>
            <Suspense fallback={<h1 className="text-center font-bold my-5">loading...</h1>}>
                <div className="flex flex-col text-center items-center">
                    <Outlet />
                </div>
            </Suspense>
        </div>
    )
}

export default AppLayout;