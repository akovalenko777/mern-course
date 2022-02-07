import React, {useEffect, useState, useContext} from 'react';
import useHttp from "../hooks/http.hook.js";
import useMessage from "../hooks/message.hook.js";
import AuthContext from '../context/AuthContext.js';

const AuthPage = ()=>{
    const {login} = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    
    const [form, setForm] = useState({
        email:'',
        password:''
    })

    useEffect(()=>{
        console.log(error)
        if(error && error.errors){
            if(error.errors){
                error.errors.forEach(err=>{
                    message(err.msg, 'error');        
                });
            }
            //if(error.message!==""){
                message(error.message, 'warning');
            //}
            //clearError();
        }
    }, [error, message, clearError])

    useEffect(()=>{
        window.M.updateTextFields();
    }, []);

    const changeHandler = (e)=>{
        setForm({...form, [e.target.name]: e.target.value})
    }

    const registerHandler = async ()=>{
        try{
            const data = await request('/api/auth/register', "POST", {...form});
            console.log(data);
            message(data.message, "success");
            setForm({
                email:'',
                password:''
            });
        }catch(e){}
    }

    const loginHandler = async ()=>{
        try{
            const data = await request('/api/auth/login', "POST", {...form});
            login(data.token, data.user._id);
            console.log(data);
            //message(data.message, "success");
        }catch(e){}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Please authorize</span>
                    
                        <div className="input-field">
                            <input id="first_name" type="text" onChange={changeHandler} className="yellow-input" name="email" value={form.email} />
                            <label htmlFor="first_name">Email</label>
                        </div>
                        <div className="input-field">
                            <input id="password" type="password" name="password" onChange={changeHandler} className="yellow-input" value={form.password} />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className='btn yellow darken-4' onClick={loginHandler} style={{marginRight:20}} disabled={loading}>Sign In</button>
                        <button className='btn gray lighten-1 black-text' onClick={registerHandler} disabled={loading}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage