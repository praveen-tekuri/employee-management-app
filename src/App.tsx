import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './AppLayout'
import AddEmployee from './pages/AddEmployee'
import Employees from './pages/Employees'
import Statistics from './pages/Statistics'

function App() {
  return (
    <div>
        <Routes>
          <Route path='/'  element={<AppLayout/>}>
              <Route index element={<AddEmployee/>}/>
              <Route path='edit-employee' element={<AddEmployee/>}/>
              <Route path='employees' element={<Employees/>}/>
              <Route path='statistics' element={<Statistics/>}/>
          </Route>
        </Routes>
    </div>
  )
}

export default App
