import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Employee } from "../features/dashboard/types/employee.types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AuthContextType{
    user: Employee | null,
    handleLogin: (username: string, password: string) => Promise<Employee | null>;
    handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);


const AuthProvider = ({children}:{children:ReactNode}) => {
    const [user, setUser] = useState<Employee | null>(null);
    
    const navigate = useNavigate();

    // persist user on page refresh
    useEffect(() => {
        const storedEmployee = localStorage.getItem("loggedInEmployee");
        if(storedEmployee){
            setUser(JSON.parse(storedEmployee));
        }
    },[])

    const handleLogin = useCallback(async(username: string, password: string) => {
        try {
            const resp = await axios.post("http://localhost:3000/login", {email: username});
            const {email} = resp.data.employee;
            const foundUser = email === username && `${email.slice(0, 4)}@123` === password;
            if(!foundUser) return null;
            setUser(resp.data.employee);
            localStorage.setItem("loggedInEmployee", JSON.stringify(resp.data.employee));
            return resp.data.employee;
        } catch (error) {
            console.error(error);
            return null;
        }
    },[])

    const handleLogout = useCallback(() => {
        setUser(null);
        localStorage.removeItem("loggedInEmployee");
        navigate("login")
    },[])

    const contextValues = useMemo(() => ({
        user, handleLogin, handleLogout
    }),[user, handleLogin, handleLogout])

    return <AuthContext.Provider value={contextValues}>
        {children}
    </AuthContext.Provider>
}

export const useGlobalAuthContext = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useGlobalAuthContext must be within a provider")
    }
    return context;
}

export default AuthProvider;