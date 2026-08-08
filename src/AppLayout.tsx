import { Link, Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        
        {/* Header */}
        <nav className='flex items-center justify-between bg-slate-300 p-5'>
            <div className="text-xl">
                <Link to="/">Employee Management</Link>
            </div>
            <ul className='flex gap-6'>
                <li><Link to="/employees">Employees</Link></li>
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