import { Link, Outlet } from 'react-router-dom'

const EmployeeDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-172px)] overflow-hidden bg-gray-100">
        <aside className='w-full md:w-1/5 md:flex-none md:h-full md:overflow-y-auto bg-slate-800 text-white p-6'>
            <div className="font-bold text-xl mb-6">EmployeeDashboard</div>
            <nav>
                <ul className='space-y-3'>
                    <li><Link className='py-2' to="profile">Profile</Link></li>
                    <li><Link className='py-2' to="learnings">Learnings</Link></li>
                    <li><Link className='py-2' to="quiz">Take Quiz</Link></li>
                    <li><Link className='py-2' to="cab-booking">Cab Booking</Link></li>
                    <li><Link className='py-2' to="shopping">Shopping</Link></li>
                </ul>
            </nav>
        </aside>
        <main className="w-full md:w-4/5 p-6 md:h-full overflow-y-auto">
            <Outlet/>
        </main>
    </div>
  )
}

export default EmployeeDashboard
