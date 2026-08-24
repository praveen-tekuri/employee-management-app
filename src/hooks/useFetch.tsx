import axios from "axios";
import { useCallback, useState } from "react"

function useFetch<T>(){
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async(url: string) => {
        setLoading(true);
        setError(null);
        try {
            const resp = await axios.get<T>(url);
            setData(resp.data);
        } catch (error) {
            setError("Failed to fetch data");
            console.error("Failed to fetch data: ", error);
            setData(null);
        }finally{
            setLoading(false);
        }
    },[]);

    return {data, loading, error, fetchData}
}

export default useFetch