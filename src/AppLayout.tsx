import { Link, Outlet, useLocation } from 'react-router-dom'
import { useGlobalEmployee } from './context/EmployeeContext'
import { useEffect } from 'react';
import { useGlobalAuthContext } from './context/AuthContext';

const AppLayout = () => {
  
  const {handleClearUpdateId} = useGlobalEmployee();
  const location = useLocation();
  const {handleLogout, user} = useGlobalAuthContext();
  // Clear Update Employee Data on Unmount or when navigating away from edit-employee route
  useEffect(() => {
    if(!location.pathname.startsWith("/edit-employee")){
        handleClearUpdateId();
    }
  },[location.pathname, handleClearUpdateId])
  
  return (
    <div className='flex flex-col min-h-screen'>
        
        {/* Header */}
        <nav className='flex items-center justify-between bg-slate-300 p-5'>
            <div className="text-xl">
                <Link to="/">Employee Management</Link>
            </div>
            <ul className='flex gap-6'>
                {user?.role === "Admin" && (
                    <>
                        <li><Link to="/add-employee">Add Employee</Link></li>
                        <li><Link to="/employees">Employees</Link></li>
                        <li><Link to="/statistics">Employee Statistics</Link></li>
                    </>
                )}
                {user?.role === "Employee" && (
                    <li><Link to="/profile">Profile</Link></li>  
                )}
                {user ? (
                    <button onClick={handleLogout} className='cursor-pointer'> {user.role}: Logout</button>
                ): <li><Link to="/login">Login</Link></li>}
            </ul>
        </nav>
        
        {/* Main Content */}
        <div className="p-5">
            <Outlet/>
        </div>
        
        {/* Footer */}
        <footer className='mt-auto bg-black text-white p-5'>
            <p>@Employee Management App - {new Date().getFullYear()}</p>
        </footer>
    </div>
  )
}

export default AppLayout