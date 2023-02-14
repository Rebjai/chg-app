import { Outlet } from "react-router-dom";

function AppLayout() {
    return (
        <div className="App">
            <header>heasd</header>
            <div className="flex flex-col text-center items-center">
                <Outlet />
            </div>
        </div>
    )
}

export default AppLayout;