import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './AppLayout'
import AddEmployee from './pages/AddEmployee'
import Employees from './pages/Employees'
import Statistics from './pages/Statistics'
import ProtectedRoute, { type User } from './ProtectedRoute'
import Home from './pages/Home'

function App() {
  const user:User = {id: 101, name: "praveen", role: "admin"};
  return (
    <div>
        <Routes>
          <Route path='/'  element={<AppLayout/>}>
              <Route index element={<Home/>}/>
              <Route element ={<ProtectedRoute user={user} allowedRoutes={["employee"]} />}>
                <Route path='edit-employee' element={<AddEmployee/>}/>
              </Route>
              <Route element={<ProtectedRoute user={user} allowedRoutes={['admin']}/>}>
                <Route path='add-employee' element={<AddEmployee/>}/>
                <Route path='employees' element={<Employees/>}/>
                <Route path='statistics' element={<Statistics/>}/>
              </Route>
          </Route>
        </Routes>
    </div>
  )
}

export default App
