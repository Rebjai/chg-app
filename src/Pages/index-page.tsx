import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Utils/UseAuth";

interface NavState {
    isActive: boolean
    isPending: boolean
}

function IndexPage() {
    const {t} = useTranslation()
    const { auth, logout } = useAuth()
    const navigate = useNavigate()
    const handleLogout = () => {
        logout!()
        navigate('/')
    }
    const handleNavState = ({ isActive, isPending }: NavState) => {
        return (isPending ? "bg-cyan-300" : isActive ? "bg-cyan-500" : "bg-cyan-400") + "bg-cyan-400 rounded p-3 drop-shadow-md text-slate-600 font-bold tracking-widest"
    }
    return (
        <>
            <ul className="flex flex-col gap-5">
                <li>
                    <NavLink to={'consumption-sheets'}>
                        {({ isActive, isPending }) => (
                            <button className={(isPending ? "bg-cyan-700 text-slate-200" : isActive ? "bg-cyan-500 text-slate-200" : "bg-cyan-400 text-slate-600") + " rounded p-3 drop-shadow-md font-bold tracking-widest"}>
                                {t('consumption_sheets')}
                            </button>
                        )}

                    </NavLink>
                </li>
                <li>
                    <NavLink to={'patients'}>
                        {({ isActive, isPending }) => (
                            <button className={(isPending ? "bg-cyan-700 text-slate-200" : isActive ? "bg-cyan-500 text-slate-200" : "bg-cyan-400 text-slate-600") + " rounded p-3 drop-shadow-md font-bold tracking-widest"}>
                                {t('patients')}
                            </button>
                        )}
                    </NavLink>
                </li>
                {auth.user.role == '1' ? null : <>
                    <li>
                        <NavLink to={'consumption-sheet-details'}>
                            {({ isActive, isPending }) => (
                                <button className={(isPending ? "bg-cyan-700 text-slate-200" : isActive ? "bg-cyan-500 text-slate-200" : "bg-cyan-400 text-slate-600") + " rounded p-3 drop-shadow-md font-bold tracking-widest"}>
                                    {t('consumption_details')}
                                </button>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'rooms'}>
                            {({ isActive, isPending }) => (
                                <button className={(isPending ? "bg-cyan-700 text-slate-200" : isActive ? "bg-cyan-500 text-slate-200" : "bg-cyan-400 text-slate-600") + " rounded p-3 drop-shadow-md font-bold tracking-widest"}>
                                    {t('rooms')}
                                </button>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'products'}>
                            {({ isActive, isPending }) => (
                                <button className={(isPending ? "bg-cyan-700 text-slate-200" : isActive ? "bg-cyan-500 text-slate-200" : "bg-cyan-400 text-slate-600") + " rounded p-3 drop-shadow-md font-bold tracking-widest"}>
                                    {t('products')}
                                </button>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'staff'}>
                            {({ isActive, isPending }) => (
                                <button className={(isPending ? "bg-cyan-700 text-slate-200" : isActive ? "bg-cyan-500 text-slate-200" : "bg-cyan-400 text-slate-600") + " rounded p-3 drop-shadow-md font-bold tracking-widest"}>
                                   {t('staff')}
                                </button>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'users'}>
                            {({ isActive, isPending }) => (
                                <button className={(isPending ? "bg-cyan-700 text-slate-200" : isActive ? "bg-cyan-500 text-slate-200" : "bg-cyan-400 text-slate-600") + " rounded p-3 drop-shadow-md font-bold tracking-widest"}>
                                    {t('users')}
                                </button>
                            )}
                        </NavLink>
                    </li>
                </>
                }{auth.user.role != '1' ? null : (
                    <li>
                        <NavLink to={'/auth/profile'}>
                            {({ isActive, isPending }) => (
                                <button className={(isPending ? "bg-cyan-700 text-slate-200" : isActive ? "bg-cyan-500 text-slate-200" : "bg-cyan-400 text-slate-600") + " rounded p-3 drop-shadow-md font-bold tracking-widest"}>
                                    {t('profile')}
                                </button>
                            )}
                        </NavLink>
                    </li>
                )}


                <li>
                    <button className="bg-red-500 rounded p-3 drop-shadow-md text-slate-200 font-bold tracking-widest" onClick={handleLogout}>
                    {t('logout')}
                    </button>
                </li>
            </ul>
        </>

    );
}

export default IndexPage;