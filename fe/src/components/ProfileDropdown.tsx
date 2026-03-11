import { useState } from "react"
import { useAuth } from "../context/AuthContext";
import { User } from "lucide-react";

function ProfileDropdown() {
    const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false)

    const { logout } = useAuth()

    return (
        <div>
            <div className="absolute top-5 right-5">
                <button
                    className="w-10 h-10 rounded-4xl cursor-pointer flex justify-center items-center hover:bg-gray-900"
                    onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                >
                    <User className="text-blue-500" />
                </button>
            </div>
            <div className={`absolute top-17 right-5 bg-gray-900 w-30 px-1 py-2 rounded-md text-white flex flex-col gap-1 ${isDropdownVisible ? 'block' : 'hidden'}`}>
                <button
                    className="bg-red-500 rounded-md px-1 py-0.5 cursor-pointer"
                    onClick={() => logout()}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default ProfileDropdown
