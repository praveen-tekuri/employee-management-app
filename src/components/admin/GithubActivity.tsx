import { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch";

interface ApiResponse{
    avatar_url: string;
    name: string;
    company: string;
    location: string;
    public_repos: number;
}

const GithubActivity = () => {
  const [term, setTerm] = useState("");
  const {loading, data:user, error, fetchData} = useFetch<ApiResponse>();
  
  useEffect(() => {
    if(!term.trim()) return; 
     const timer = setTimeout(() => {
        fetchData(`https://api.github.com/users/${term}`);
     }, 800);
     return () => clearTimeout(timer);
  },[term, fetchData])

  return (
    <div>
        <h1>Check GitHub Activity</h1>
        <input value={term} onChange={(e) => setTerm(e.target.value)} type="text" placeholder="Search Employee" className="border rounded p-2" />
        {loading && <p className="mt-2">Loading...</p>}
        {error && <p className="mt-2 text-red-500">{error}</p>}
        {user && (
            <div className="user-details mt-5">
                <img src={user?.avatar_url} className="w-20 rounded" alt={user.name} />
                <h3 className="mt-3 font-semibold">Name: {user.name}</h3>
                <p className="mt-2">Company: {user.company}</p>
                <p className="mt-2">Location: {user.location}</p>
                <p>{
                    user.public_repos > 50 ? "Active Developer" :
                    user.public_repos > 10 ? "Regular Developer" : "Beginner"
                    }
                </p>
            </div>
        )}
    </div>
  )
}

export default GithubActivity