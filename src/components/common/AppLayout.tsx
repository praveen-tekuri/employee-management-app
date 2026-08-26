import { Outlet } from "react-router-dom"
import Navbar from "./Header"
import Footer from "./Footer"

const AppLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar/>
       
        <div className="p-5">
            <Outlet/>
        </div>
        
        <Footer/>
    </div>
  )
}

export default AppLayout