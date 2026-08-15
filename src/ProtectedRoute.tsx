import { Navigate, Outlet } from "react-router-dom"

// Authentication & Authorization

type UserRole = "admin" | "employee";

export interface User{
    id: number | string,
    name: string,
    role: UserRole
}

interface ProtectedRouteProps{
    user: User | null | undefined;
    allowedRoutes?: string[]
}

const ProtectedRoute = ({user, allowedRoutes}:ProtectedRouteProps) => {
    // Check if user loggedIn, if not redirect to Login or specified page
    if(!user) return <Navigate to="/" replace/>

    // Check if route requires specific role, if not redirect to unauthorized fallback page or message
    if(allowedRoutes && !allowedRoutes.includes(user.role)) return "Not Authorized"
    
    // Render children if all checks pass
    return <Outlet/>
}

export default ProtectedRoute