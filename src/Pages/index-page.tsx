import { Link } from "react-router-dom";

function IndexPage() {
    return (
        <>
            <ul className="flex flex-col gap-5">
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
            </ul>
        </>

    );
}

export default IndexPage;