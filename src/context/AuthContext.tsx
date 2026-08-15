import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface User{
    email: string,
    password: string,
    role: "Admin" | "Employee"
}

interface AuthContextType{
    user: User | null,
    handleLogin: (username: string, password: string) => User | null;
    handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);


const AuthProvider = ({children}:{children:ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const isLoggedInUserExist = localStorage.getItem("LoggedInUser");
        const storedUser: User = isLoggedInUserExist ? JSON.parse(isLoggedInUserExist): null;
        if(storedUser) setUser(storedUser);
    },[])

    const handleLogin = (username: string, password: string): User | null => {
        const isEmployeesExist = localStorage.getItem("employees");
        const employees: User[] = isEmployeesExist ? JSON.parse(isEmployeesExist): []
        const foundUser = employees.find((emp) => emp.email === username && `${emp.email.slice(0, 4)}@123` === password);
        if(foundUser){
            localStorage.setItem("LoggedInUser", JSON.stringify(foundUser));
            setUser(foundUser);
            return foundUser;
        }
        return null;
    }

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("LoggedInUser");
    }

    return <AuthContext.Provider value={{user, handleLogin, handleLogout}}>
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