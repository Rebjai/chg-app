import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Utils/UseAuth";

function IndexPage() {
    const { auth, logout } = useAuth()
    const navigate = useNavigate()
    const handleLogout = () => {
        logout!()
        navigate('/')
    }
    return (
        <>
            <ul className="flex flex-col gap-5">
                <li>
                    <Link to={'consumption-sheets'}>
                        <button className="bg-cyan-400 rounded p-3 drop-shadow-md text-slate-600 font-bold tracking-widest">
                            Hojas de Consumo
                        </button>
                    </Link>
                </li>
                {auth.user.role == '1' ? null : <>
                    <li>
                        <Link to={'consumption-sheet-details'}>
                            <button className="bg-cyan-400 rounded p-3 drop-shadow-md text-slate-600 font-bold tracking-widest">
                                Detalles de Hojas de Consumo
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to={'rooms'}>
                            <button className="bg-cyan-400 rounded p-3 drop-shadow-md text-slate-600 font-bold tracking-widest">
                                Cuartos
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to={'patients'}>
                            <button className="bg-cyan-400 rounded p-3 drop-shadow-md text-slate-600 font-bold tracking-widest">
                                Patients
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to={'products'}>
                            <button className="bg-cyan-400 rounded p-3 drop-shadow-md text-slate-600 font-bold tracking-widest">
                                Products
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to={'staff'}>
                            <button className="bg-cyan-400 rounded p-3 drop-shadow-md text-slate-600 font-bold tracking-widest">
                                Staff
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to={'users'}>
                            <button className="bg-cyan-400 rounded p-3 drop-shadow-md text-slate-600 font-bold tracking-widest">
                                Users
                            </button>
                        </Link>
                    </li>
                </>
                }{auth.user.role != '1' ? null : (
                    <li>
                        <Link to={'/auth/profile'}>
                            <button className="bg-cyan-400 rounded p-3 drop-shadow-md text-slate-600 font-bold tracking-widest">
                                Profile
                            </button>
                        </Link>
                    </li>
                )}


                <li>
                    <button className="bg-red-500 rounded p-3 drop-shadow-md text-slate-200 font-bold tracking-widest" onClick={handleLogout}>
                        Logout
                    </button>
                </li>
            </ul>
        </>

    );
}

export default IndexPage;