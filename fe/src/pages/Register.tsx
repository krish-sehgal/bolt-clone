import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/create`, { email, password }, { withCredentials: true })
            const data = response.data
            if (data.success) {
                navigate('/')
            }
        } catch (error: any) {
            setError(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="bg-linear-to-br from-gray-900 to-gray-800 min-h-screen flex justify-center items-center">
            <div className="bg-gray-900 px-10 py-10 rounded-md">
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <div className="flex justify-center pb-5">
                    <p className="text-2xl text-white">Register</p>
                </div>
                <form className=" flex flex-col items-center gap-3" onSubmit={handleRegister}>
                    <input
                        type="email"
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
                    <button type="submit" className="bg-purple-400 w-100 rounded-md px-4 py-2 cursor-pointer" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register
