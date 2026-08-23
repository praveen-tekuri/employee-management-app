import { useEffect, useState } from "react"

interface ApiResponse{
    avatar_url: string;
    name: string;
    company: string;
    location: string;
    public_repos: number;
}

const GithubActivity = () => {
  const [term, setTerm] = useState("");
  const [user, setUser] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  
  const fetchUser = async () => {
    if(!term) return;
    setLoading(true);
    try {
        const resp = await fetch(`https://api.github.com/users/${term}`);
        const json: ApiResponse = await resp.json();
        if(resp.status !== 200){
            setUser(null);
        }else{
            setUser(json as ApiResponse);
        }
    } catch (error) {
        console.error(error);
        setUser(null);
    } finally{
        setLoading(false);
    }
  }

  useEffect(() => {
     const timer = setTimeout(() => {
        fetchUser();
     }, 800);
     return () => clearTimeout(timer);
  },[term])

  return (
    <div>
        <h1>Check GitHub Activity</h1>
        <input value={term} onChange={(e) => setTerm(e.target.value)} type="text" placeholder="Search Employee" className="border rounded p-2" />
        {loading && <p className="mt-2">Loading...</p>}
        {!loading && !user && term && <p className="mt-2">User not found</p>}
        {user !== null && (
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