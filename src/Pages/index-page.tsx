import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Utils/UseAuth";

interface NavState {
    isActive: boolean
    isPending: boolean
}

function IndexPage() {
    const { t } = useTranslation()
    const { auth, logout } = useAuth()
    const navigate = useNavigate()
    const handleLogout = () => {
        logout!()
        navigate('/')
    }
    const handleNavState = ({ isActive, isPending }: NavState) => {
        return (isPending ? "bg-violet-300" : isActive ? "bg-violet-500" : "bg-green-500") + " rounded py-3 px-4 drop-shadow-md text-slate-100 font-bold tracking-widest w-full hover:bg-green-400"
    }
    return (
        <>
            <ul className="flex flex-col gap-5">
                <li>
                    <NavLink to={'consumption-sheets'}>
                        {({ isActive, isPending }) => (
                            <button className={handleNavState({isActive, isPending})}>
                                {t('consumption_sheets')}
                            </button>
                        )}

                    </NavLink>
                </li>
                {/* <li>
                        <NavLink to={'consumption-sheet-details'}>
                        {({ isActive, isPending }) => (
                            <button className={(isPending ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-slate-200" : isActive ? "bg-violet-500 text-slate-200" : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-slate-200") + " rounded py-3 px-4 drop-shadow-md font-bold tracking-widest w-full"}>
                            {t('consumption_details')}
                            </button>
                            )}
                            </NavLink>
                        </li> */}
                <li>
                    <NavLink to={'patients'}>
                        {({ isActive, isPending }) => (
                            <button className={handleNavState({isActive, isPending})}>
                                {t('patients')}
                            </button>
                        )}
                    </NavLink>
                </li>
                {auth.user.role == '1' ? null : <>
                    <li>
                        <NavLink to={'areas'}>
                            {({ isActive, isPending }) => (
                                <button className={handleNavState({isActive, isPending})}>
                                    {t('areas')}
                                </button>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'rooms'}>
                            {({ isActive, isPending }) => (
                                <button className={handleNavState({isActive, isPending})}>
                                    {t('rooms')}
                                </button>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'products'}>
                            {({ isActive, isPending }) => (
                                <button className={handleNavState({isActive, isPending})}>
                                    {t('products')}
                                </button>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'staff'}>
                            {({ isActive, isPending }) => (
                                <button className={handleNavState({isActive, isPending})}>
                                    {t('staff')}
                                </button>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink end to={'users'}>
                            {({ isActive, isPending }) => (
                                <button className={handleNavState({isActive, isPending})}>
                                    {t('users')}
                                </button>
                            )}
                        </NavLink>
                    </li>
                </>
                }{auth.user.role == '10' ? null : (
                    <li>
                        <NavLink to={'/auth/profile'}>
                            {({ isActive, isPending }) => (
                                <button className={(isPending ? "bg-cyan-400 text-slate-200" : isActive ? "bg-violet-500 text-slate-200" : "bg-cyan-500 text-slate-200") + " rounded py-3 px-4 drop-shadow-md font-bold tracking-widest w-full hover:bg-cyan-400"}>
                                    {t('profile')}
                                </button>
                            )}
                        </NavLink>
                    </li>
                )}
                <li>
                    <NavLink to={'/users/account'}>
                        {({ isActive, isPending }) => (
                            <button className={(isPending ? "bg-cyan-400 text-slate-200" : isActive ? "bg-violet-500 text-slate-200" : "bg-cyan-500 text-slate-200") + " rounded py-3 px-4 drop-shadow-md font-bold tracking-widest w-full hover:bg-cyan-400"}>
                                {t('account')}
                            </button>
                        )}
                    </NavLink>
                </li>

                <li>
                    <button className="bg-rose-600 hover:bg-rose-700 rounded py-3 px-4 drop-shadow-md text-slate-200 font-bold tracking-widest w-full" onClick={handleLogout}>
                        {t('logout')}
                    </button>
                </li>
            </ul>
        </>

    );
}

export default IndexPage;