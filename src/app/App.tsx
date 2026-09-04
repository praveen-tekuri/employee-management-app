import { Route, Routes } from 'react-router-dom'
import '../App.css'
import AppLayout from '../components/common/AppLayout'
import AddEmployee from '../components/shared/AddEmployee'
import Employees from '../features/dashboard/components/admin/Employees'
import Statistics from '../features/dashboard/components/admin/Statistics'
import ProtectedRoute from '../components/shared/ProtectedRoute'
import Home from '../pages/Home'
import Login from '../features/auth/pages/Login'
import Profile from '../features/dashboard/components/employee/Profile'
import AdminDashboard from '../features/dashboard/pages/AdminDashboard'
import EmployeeDashboard from '../features/dashboard/pages/EmployeeDashboard'
import Unauthorized from '../features/auth/pages/Unauthorized'
import Quiz from '../features/dashboard/components/employee/Quiz'
import Weather from '../features/weather/components/Weather'
import FaqContainer from '../features/faq/pages/FaqContainer'
import Learnings from '../features/dashboard/components/employee/Learnings'
import GithubActivity from '../features/github/pages/GithubActivity'
import TodoContainer from '../features/todos/pages/TodoContainer'
import Shopping from '../features/shopping/pages/Shopping'
import Products from '../features/shopping/pages/Products'
import { ProductDetails } from '../components/shared/ProductDetails'
import Cart from '../features/shopping/pages/Cart'

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

              <Route element={<ProtectedRoute allowedRoutes={["employee", "admin"]}/>}>
                  <Route path='shopping' element={<Shopping/>}/>
                  <Route path='products' element={<Products/>}/>
                  <Route path='products/:id' element={<ProductDetails/>}/>
                  <Route path='cart' element={<Cart/>}/>
              </Route>
              <Route element ={<ProtectedRoute allowedRoutes={["employee"]} />}>
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
              
              <Route element={<ProtectedRoute allowedRoutes={['admin']}/>}>
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
