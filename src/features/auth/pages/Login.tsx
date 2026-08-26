import { useState, type FormEvent } from "react"
import { useGlobalAuthContext } from "../../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const {handleLogin, user} = useGlobalAuthContext();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleLoginSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(handleLogin(emailId, password)){
        alert("Login Successful");
        navigate("/");
    }else{
        alert("Invalid Credentials");
    }
    setEmailId("");
    setPassword("");
  }
  
  if(user) return <Navigate to="/" replace/>

  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit} className="border p-5 rounded w-[50%] mx-auto">
            <div className="email">
                <label htmlFor="email">Email Id</label>
                <input value={emailId} onChange={(e) => setEmailId(e.target.value)} name="email" type="email" required className="border ml-3 rounded p-2" />
            </div>
            <div className="password mt-5">
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" required className="border ml-3 rounded p-2" />
            </div>
            <button type="submit" className="border cursor-pointer rounded p-2 w-[30%] mt-5">Login</button>
        </form>
    </div>
  )
}

export default Login