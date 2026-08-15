import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './AppLayout'
import AddEmployee from './pages/AddEmployee'
import Employees from './pages/Employees'
import Statistics from './pages/Statistics'
import ProtectedRoute from './ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'

function App() {
  return (
    <div>
        <Routes>
          <Route path='/'  element={<AppLayout/>}>
              <Route index element={<Home/>}/>
              <Route path='login' element={<Login/>}/>

              <Route element ={<ProtectedRoute allowedRoutes={["Employee"]} />}>
                <Route path='edit-employee' element={<AddEmployee/>}/>
                <Route path='profile' element={<Profile/>}/>
              </Route>
              
              <Route element={<ProtectedRoute allowedRoutes={['Admin']}/>}>
                <Route path='add-employee' element={<AddEmployee/>}/>
                <Route path='employees' element={<Employees/>}/>
                <Route path='statistics' element={<Statistics/>}/>
              </Route>
              
              <Route path='unauthorized' element={<h1>Not Authorized</h1>}/>
              <Route path='*' element={<h1>Page Not Found</h1>}/>
          </Route>
        </Routes>
    </div>
  )
}

export default App
