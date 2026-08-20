import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './components/layout/AppLayout'
import AddEmployee from './pages/admin/AddEmployee'
import Employees from './pages/admin/Employees'
import Statistics from './pages/admin/Statistics'
import ProtectedRoute from './components/layout/ProtectedRoute'
import Home from './pages/home/Home'
import Login from './pages/auth/Login'
import Profile from './pages/employee/Profile'
import AdminDashboard from './dashboard/AdminDashboard'
import EmployeeDashboard from './dashboard/EmployeeDashboard'
import Unauthorized from './pages/auth/Unauthorized'

function App() {
  return (
    <div>
        <Routes>
          <Route path='/'  element={<AppLayout/>}>
              <Route index element={<Home/>}/>
              <Route path='login' element={<Login/>}/>

              <Route element ={<ProtectedRoute allowedRoutes={["Employee"]} />}>
                  <Route path='employee/dashboard' element={<EmployeeDashboard/>}>
                      <Route index element={<Profile/>}/>
                      <Route path='profile' element={<Profile/>}/>
                      <Route path='learnings' element={<h1>Learnings</h1>}/>
                      <Route path='quiz' element={<h1>Quiz component</h1>}/>
                      <Route path='weather' element={<h1>Check Weather</h1>}/>
                      <Route path='cab-booking' element={<h1>Cab Booking</h1>}/>
                      <Route path='shopping' element={<h1>Shopping</h1>}/>
                  </Route>
              </Route>
              
              <Route element={<ProtectedRoute allowedRoutes={['Admin']}/>}>
                  <Route path='admin/dashboard' element={<AdminDashboard/>}>
                      <Route index element={<AddEmployee/>}/>
                      <Route path='add-employee' element={<AddEmployee/>}/>
                      <Route path='employees' element={<Employees/>}/>
                      <Route path='statistics' element={<Statistics/>}/>
                      <Route path='reports' element={<h1>Reports</h1>}/>
                  </Route>
              </Route>

              <Route path='unauthorized' element={<Unauthorized/>}/>
              <Route path='*' element={<h1>Page Not Found</h1>}/>
          </Route>
        </Routes>
    </div>
  )
}

export default App
