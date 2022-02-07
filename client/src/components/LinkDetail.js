import  React from "react";

const LinkDetail = ({link})=>{

    return (
        <>
        <h3>Link detail</h3>
        <ul>
            <li><b>Your link: </b> <a href={link.to} target="_blank" rel="noreferrer">{link.to}</a></li>
            <li><b>Created from: </b> <a href={link.from} target="_blank" rel="noreferrer">{link.from}</a></li>
            <li><b>Clicks:</b> {link.clicks}</li>
            <li><b>Created date:</b> {new Date(link.date).toLocaleDateString()}</li>
        </ul>
        </>
    )

}

export default LinkDetail;