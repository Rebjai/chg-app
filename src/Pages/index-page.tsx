import { Link } from "react-router-dom";

function IndexPage() {
    return (
        <>
            <ul>
                <li>
                    <Link to={'rooms'}>
                        <button className="bg-cyan-400 rounded p-3 drop-shadow-md text-slate-600 font-bold tracking-widest">
                            Cuartos
                        </button>
                    </Link>
                </li>
            </ul>
        </>

    );
}

export default IndexPage;