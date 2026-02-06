import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../configs/firebase";
import ErrorToast from "../components/ErrorToast";

const auth = getAuth(app);

function getErrorMessage(statusCode: string): string {
    switch (statusCode){
        case 'auth/email-already-in-use':
            return 'Email Already Registered';
        default:
            return 'something went wrong';
    }
}

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log('account created successfuly');
                console.log('uid:', res.user.uid);
            })
            .catch((e) => {
                setError(getErrorMessage(e.code))
            })
    }
    return (
        <div className="bg-linear-to-br from-gray-900 to-gray-800 min-h-screen flex justify-center items-center">
            {error && <ErrorToast message={error} onClose={() => setError('')} />}
            <div className="bg-gray-900 px-10 py-10 rounded-md">
                <div className="flex justify-center pb-5">
                    <p className="text-2xl text-white">SignUp</p>
                </div>
                <form className=" flex flex-col items-center gap-3">
                    <input
                        type="text"
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="border w-100 px-4 py-2 rounded-md text-white"
                    />
                    <input
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="border w-100 px-4 py-2 rounded-md text-white"
                    />
                    <button
                        className="bg-purple-400 w-100 rounded-md px-4 py-2 cursor-pointer"
                        onClick={handleLoginSubmit}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
