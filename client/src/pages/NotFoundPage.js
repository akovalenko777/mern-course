import React from 'react';
import {Link} from "react-router-dom";

const NotFoundPage = ()=>{
    return (
        <div>
            <h1>Error 404.</h1>
            <p>Page not found</p>
            <p>Click <Link to="/">here</Link> to main</p>
        </div>
    )
}

export default NotFoundPage