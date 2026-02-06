import { X } from "lucide-react"
import { useState } from "react"

interface ErrorToastPropsInterface {
    message: string;
    onClose?: () => void;
}

function ErrorToast({ message, onClose }: ErrorToastPropsInterface) {
    const [isVisible, setIsVisible] = useState(true);
    console.log(isVisible);

    const handleCloseButton = () => {
        setIsVisible(false)
        if (onClose) {
            onClose();
        }
    }

    if (!isVisible) return null
    return (
        <div className="bg-red-300 w-70 flex justify-between px-3 py-2 rounded-md border border-red-500 absolute top-5 right-5">
            <p>{message}</p>
            <button className="bg-red-400 p-1 rounded-md cursor-pointer"
                onClick={handleCloseButton}>
                <X className="w-4 h-4" />
            </button>
        </div>
    )
}

export default ErrorToast
