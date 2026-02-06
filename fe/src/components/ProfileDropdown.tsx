import { getAuth, signOut } from "firebase/auth";
import { useState } from "react"

const auth = getAuth();

async function handleLogout() {
    try {
        await signOut(auth);
        console.log("User logged out successfully");
    } catch (error) {
        console.error("Logout error:", error);
    }
}

function ProfileDropdown() {
    const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
    return (
        <div>
            <div className="absolute top-5 right-5">
                <button
                    className="w-10 h-10 bg-amber-50 rounded-4xl cursor-pointer"
                    onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
                </button>
            </div>
            <div className={`absolute top-17 right-5 bg-gray-900 w-30 px-1 py-2 rounded-md text-white flex flex-col gap-1 ${isDropdownVisible ? 'block' : 'hidden'}`}>
                <button className="bg-gray-700 rounded-md px-1 py-0.5 cursor-pointer">Profile</button>
                <button
                    className="bg-red-500 rounded-md px-1 py-0.5 cursor-pointer"
                    onClick={handleLogout}
                >
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default ProfileDropdown
