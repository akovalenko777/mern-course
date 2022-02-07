import React from "react";
import {Link} from "react-router-dom";

const OneLink = ({link, num})=>{
    return (
        <tr>
            <td>{num}</td>
            <td>{new Date(link.date).toLocaleDateString()}</td>
            <td>{link.clicks}</td>
            <td>{link.from}</td>
            <td>
                <Link to={"/detail/"+link._id} class="btn">View</Link>
                <button class="btn red" >Remove</button>
            </td>
        </tr>
    )

}

export default OneLink