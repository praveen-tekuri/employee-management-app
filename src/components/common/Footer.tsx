import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className='mt-auto bg-black text-white p-5 flex flex-row justify-between'>
        <p className="self-start">@Employee Management App - {new Date().getFullYear()}</p>
        <div className="self-end space-x-3">
          <Link to="weather">Weather</Link>
          <Link to="faq">Faq</Link>
          <Link to="todo">Todo</Link>
        </div>
    </footer>
   )
}

export default Footer