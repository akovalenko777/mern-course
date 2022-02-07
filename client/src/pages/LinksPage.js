import React, { useCallback, useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import useHttp from '../hooks/http.hook';
import Loader from '../components/Loader';
import LinksList from '../components/LinksList';


export default function LinksPage(){
    const {token} = useContext(AuthContext);
    const [links, setLinks] = useState([]);
    const {request, loading} = useHttp();

    const getLinks = useCallback(async ()=>{
        try{
            const data = await request('/api/link/', "GET", null, {
                Authorization:'Bearer '+token
            });
            setLinks(data);
        }catch(e){

        }
    }, [token, request]);

    useEffect(()=>{
        getLinks();
    }, [getLinks])

    if(loading){
        return <Loader />
    }

    return (
        <div>
            <h1>Links list</h1>

            {!loading && links && <LinksList links={links} />}
        </div>
    )
}