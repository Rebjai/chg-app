import { FormEvent, useState } from "react";
import chgLogo from "../../assets/chg-app.svg";




function ResetPassword() {
    const [username, setUsername] = useState('');

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

    }
    return (

        <div className="max-w-2xl flex flex-col justify-center items-center">
            <div className='flex justify-center'>
                <a href="https://vitejs.dev" className='flex flex-col items-center' target="_blank">
                    <img src={chgLogo} className="max-w-xs w-8/12" alt="CHG APP logo" />
                    <h1 className='text-2xl font-bold text-purple-700'>CHG<br /> App</h1>
                </a>
            </div>
            <form
                className="bg-white p-6 rounded-lg shadow-xl"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col text-center items-center">

                    <div className="mb-4 ">
                        <label
                            className="block text-gray-700 font-medium mb-2"
                            htmlFor="username"
                        >
                            Username:
                        </label>
                        <input
                            className="w-full border border-gray-400 p-2"
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-600">
                            Please contact an administrator, he will have to authorize your password reset.
                        </p>
                    </div>
                    <button
                        className="bg-purple-500 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded"
                        type="submit"
                    >
                        Reset Password
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ResetPassword;