import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './components/layout/AppLayout'
import AddEmployee from './components/admin/AddEmployee'
import Employees from './components/admin/Employees'
import Statistics from './components/admin/Statistics'
import ProtectedRoute from './components/layout/ProtectedRoute'
import Home from './pages/home/Home'
import Login from './pages/auth/Login'
import Profile from './pages/employee/Profile'
import AdminDashboard from './dashboard/AdminDashboard'
import EmployeeDashboard from './dashboard/EmployeeDashboard'
import Unauthorized from './pages/auth/Unauthorized'
import Quiz from './components/employee/Quiz'
import Weather from './pages/common/Weather'
import FaqContainer from './pages/common/FaqContainer'
import Learnings from './components/employee/Learnings'
import GithubActivity from './components/admin/GithubActivity'
import TodoContainer from './pages/common/TodoContainer'
import Shopping from './pages/Shopping'
import Products from './components/shopping/Products'
import { ProductDetails } from './components/shopping/ProductDetails'

function App() {
  return (
    <div>
        <Routes>
          <Route path='/'  element={<AppLayout/>}>
              <Route index element={<Home/>}/>
              <Route path='login' element={<Login/>}/>
              <Route path='weather' element={<Weather/>}/>
              <Route path='faq' element={<FaqContainer/>}/>
              <Route path='todo' element={<TodoContainer/>}/>

              <Route element={<ProtectedRoute allowedRoutes={["Employee", "Admin"]}/>}>
                  <Route path='shopping' element={<Shopping/>}/>
                  <Route path='products' element={<Products/>}/>
                  <Route path='products/:id' element={<ProductDetails/>}/>
              </Route>
              <Route element ={<ProtectedRoute allowedRoutes={["Employee"]} />}>
                  <Route path='employee/dashboard' element={<EmployeeDashboard/>}>
                      <Route index element={<Profile/>}/>
                      <Route path='profile' element={<Profile/>}/>
                      <Route path='edit-employee' element={<AddEmployee/>}/>
                      <Route path='learnings' element={<Learnings/>}/>
                      <Route path='quiz' element={<Quiz/>}/>
                      <Route path='weather' element={<Weather/>}/>
                      <Route path='cab-booking' element={<h1>Cab Booking</h1>}/>
                  </Route>
              </Route>
              
              <Route element={<ProtectedRoute allowedRoutes={['Admin']}/>}>
                  <Route path='admin/dashboard' element={<AdminDashboard/>}>
                      <Route index element={<AddEmployee/>}/>
                      <Route path='add-employee' element={<AddEmployee/>}/>
                      <Route path='employees' element={<Employees/>}/>
                      <Route path='statistics' element={<Statistics/>}/>
                      <Route path='github-activity' element={<GithubActivity/>}/>
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
