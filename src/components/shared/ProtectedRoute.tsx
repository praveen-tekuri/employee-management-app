import { Navigate, Outlet } from "react-router-dom"
import { useGlobalAuthContext } from "../../context/AuthContext";

// Authentication & Authorization

interface ProtectedRouteProps{
    allowedRoutes?: ("Admin" | "Employee")[];
}

const ProtectedRoute = ({allowedRoutes}:ProtectedRouteProps) => {
    // Check if user loggedIn, if not redirect to Login or specified page
    const {user} = useGlobalAuthContext();
    if(!user) return <Navigate to="/login" replace/>

    // Check if route requires specific role, if not redirect to unauthorized fallback page or message
    if(allowedRoutes && !allowedRoutes.includes(user.role)) return <Navigate to ="/unauthorized" replace/>
    
    // Render nested routes if all checks pass
    return <Outlet/>
}

export default ProtectedRoute