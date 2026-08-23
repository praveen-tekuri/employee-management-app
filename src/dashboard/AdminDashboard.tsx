import { Link, Outlet } from "react-router-dom"

const AdminDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-172px)] overflow-hidden bg-gray-50">
        <aside className="w-full md:w-1/5 md:flex-none md:h-full md:overflow-y-auto bg-slate-50/50 border-r border-slate-200 text-slate-500 p-6">
            <div className="font-bold text-xl mb-6">Admin Dashboard</div>
            <nav>
                <ul className="space-y-3">
                    <li><Link to="add-employee">Add Employee</Link></li>
                    <li><Link to="employees">Employees</Link></li>
                    <li><Link to="statistics">View Statistics</Link></li>
                    <li><Link to="github-activity">GitHub Activity</Link></li>
                    <li><Link to="reports">Reports</Link></li>
                </ul>
            </nav>
        </aside>
        <main className="flex-1 p-6 md:h-full overflow-y-auto">
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminDashboard