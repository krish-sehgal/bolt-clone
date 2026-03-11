import type React from "react"
import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

function GuestRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth()

    if (loading) return <div>Loading...</div>
    if (user) return <Navigate to="/" />

    return children
}

export default GuestRoute
