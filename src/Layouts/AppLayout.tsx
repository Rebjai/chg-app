import { Link, Outlet } from "react-router-dom";
import chgLogo from '../assets/chg-app.svg'

const pageTitle = location.pathname.slice(1);
function AppLayout() {
    return (
        <div className="App">
            <header className="flex justify-center items-center gap-5">

            <Link to={'/'} className="max-w-[100px] w-2/12" ><img src={chgLogo} className="w-full" alt="CHG APP logo" /></Link>
            
            <h2 className="text-2xl font-bold text-purple-700 ml-4">{pageTitle}</h2>
            </header>
            <div className="flex flex-col text-center items-center">
                <Outlet />
            </div>
        </div>
    )
}

export default AppLayout;