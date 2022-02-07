import React from "react";
import OneLink from "./OneLink";

const LinksList = ({links})=>{
    if(!links.length){
        return (
            <p>No links Yet</p>
        )
    }


    return (
        <table>
        <thead>
          <tr>
              <th>#</th>
              <th>Date</th>
              <th>Clicks</th>
              <th>From</th>
              <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {links.map((link, i) => {
              return (<OneLink link={link} num={i+1} key={link._id} />)
          })}
        </tbody>
      </table>
    );

}

export default LinksList;