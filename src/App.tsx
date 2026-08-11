import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './AppLayout'
import AddEmployee from './pages/AddEmployee'
import Employees from './pages/Employees'

function App() {
  return (
    <div>
        <Routes>
          <Route path='/'  element={<AppLayout/>}>
              <Route index element={<AddEmployee/>}/>
              <Route path='edit-employee' element={<AddEmployee/>}/>
              <Route path='employees' element={<Employees/>}/>
          </Route>
        </Routes>
    </div>
  )
}

export default App
