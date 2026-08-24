import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Employee } from "../data/models/employee.types";

interface AuthContextType{
    user: Employee | null,
    handleLogin: (username: string, password: string) => Employee | null;
    handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);


const AuthProvider = ({children}:{children:ReactNode}) => {
    const [user, setUser] = useState<Employee | null>(null);

    useEffect(() => {
        const isLoggedInUserExist = localStorage.getItem("LoggedInUser");
        const storedUser: Employee = isLoggedInUserExist ? JSON.parse(isLoggedInUserExist): null;
        if(storedUser) setUser(storedUser);
    },[])

    const handleLogin = useCallback((username: string, password: string): Employee | null => {
        const isEmployeesExist = localStorage.getItem("employees");
        const employees: Employee[] = isEmployeesExist ? JSON.parse(isEmployeesExist): []
        const foundUser = employees.find((emp) => emp.email === username && `${emp.email.slice(0, 4)}@123` === password);
        if(foundUser){
            localStorage.setItem("LoggedInUser", JSON.stringify(foundUser));
            setUser(foundUser);
            return foundUser;
        }
        return null;
    },[])

    const handleLogout = useCallback(() => {
        setUser(null);
        localStorage.removeItem("LoggedInUser");
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