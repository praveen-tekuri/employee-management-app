import { Link, useLocation } from 'react-router-dom'
import { useGlobalEmployee } from '../../context/EmployeeContext'
import { useEffect } from 'react';
import { useGlobalAuthContext } from '../../context/AuthContext';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

const Navbar = () => {
  const {handleClearUpdateId} = useGlobalEmployee();
  const location = useLocation();
  const {handleLogout, user} = useGlobalAuthContext();
  const {cartItems} = useSelector((state: RootState) => state.cart);
  
  // Clear Update Employee Data on Unmount or when navigating away from edit-employee route
  useEffect(() => {
    if(!location.pathname.startsWith("/employee/dashboard/edit-employee")){
        handleClearUpdateId();
    }
  },[location.pathname, handleClearUpdateId])

  return (
     <nav className='flex items-center justify-between bg-slate-300 p-5'>
        <div className="text-xl">
            <Link to="/">Employee Management</Link>
        </div>
        <ul className='flex gap-6'>
            {user?.role === "Admin" && (
                <>
                    <li><Link to="/admin/dashboard">Dashboard</Link></li>
                </>
            )}
            {user?.role === "Employee" && (
                <>
                    <li><Link to="/employee/dashboard">Dashboard</Link></li>  
                </>
            )}
            {user ? (
                <>
                    <li><Link to="/shopping">Shopping</Link></li>
                    <li><Link to="/cart">Cart: ({cartItems?.length})</Link></li>
                    <button onClick={handleLogout} className='cursor-pointer'> {user.role}: Logout</button>
                </>
            ): <li><Link to="/login">Login</Link></li>}
        </ul>
    </nav>
  )
}

export default Navbar