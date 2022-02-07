import React, {useState,  useContext} from 'react';
import AuthContext from '../context/AuthContext';
import useHttp from '../hooks/http.hook';
import {useNavigate} from "react-router-dom";


const CreatePage = ()=>{
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const [link, setLink] = useState('');
    const nav = useNavigate();

    const changeHandler = (e)=>{
        setLink(e.target.value);
    }

    const keypressHandler = async (e)=>{
        if(e.key==="Enter"){
            try {
                const data = await request('/api/link/generate', "POST", {from: link}, {
                    Authorization: 'Bearer '+auth.token
                });
                nav(`/detail/${data.link._id}`);
            }catch(err){

            }
        }
    }

    return (
        <div className='row'>
            <div className="col s8 offset-s1" style={{paddingTop:'2rem'}}>
                <div className="input-field">
                    <input id="link" type="text" onChange={changeHandler} value={link} onKeyPress={keypressHandler} />
                    <label htmlFor="link">Enter link</label>
                </div>
            </div>
        </div>
    )
}

export default CreatePage