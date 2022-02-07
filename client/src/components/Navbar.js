import React, {useContext} from "react";
import AuthContext from '../context/AuthContext';
import {Link, useNavigate} from "react-router-dom";

const Navbar = ()=>{
    const {logout} = useContext(AuthContext);
    const nav = useNavigate();
    const logoutHandler = (e)=>{
        e.preventDefault();
        logout();
        nav("/");
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{padding:'0 0.7em'}}>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="/">Create</Link></li>
                <li><Link to="/links">Links</Link></li>
                <li><button className="btn" onClick={logoutHandler}>Logout</button></li>
            </ul>
            </div>
        </nav>
    );
}

export default Navbar