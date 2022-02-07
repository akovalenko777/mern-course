import {useState, useCallback} from 'react';

const useHttp = ()=>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});

    const request = useCallback(async (url, method = "GET", body = null, headers = {})=>{
        setLoading(true);
        try {
            if(body){
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }
            const response = await fetch(url, {method, body, headers});
            const data = await response.json();
            if(!response.ok){
                
                setError({errors: data.errors, message:data.message});
                throw new Error(data.message || "AJAX error");
            }

            setLoading(false);
            return data;
        }catch(err){   
            setLoading(false);
            setError({errors: [], message:err.message});
            throw err;
        }
    }, []);

    const clearError = useCallback(()=>setError(null), []);

    return {loading, request, error, clearError}
}

export default useHttp;