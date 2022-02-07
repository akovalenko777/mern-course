import React, { useCallback, useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import {useParams} from "react-router-dom";
import useHttp from '../hooks/http.hook';
import Loader from '../components/Loader';
import LinkDetail from '../components/LinkDetail';

const DetailPage = ()=>{
    const {request, loading} = useHttp();
    const [link, setLink] = useState();
    const {token} = useContext(AuthContext);

    const id = useParams().id;

    const getLink = useCallback(async()=>{
        try{
            const data = await request('/api/link/'+id, "GET", null, {
                Authorization:"Bearer "+token
            });
            setLink(data);
        }catch(e){

        }
    }, [id, token, request]);

    useEffect(()=>{
        getLink();
    }, [getLink])
    
    if(loading){
        return <Loader />
    }

    return (
        <div>
            {!loading && link && <LinkDetail link={link} />}

        </div>
    )
}

export default DetailPage