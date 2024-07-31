import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function TopPanel(props) {

    const arrow = "<";

    return (
        <div className="logo_name_box">
            <Link className='go_back' to={props.link}><p className='arr_transform'>{arrow}</p></Link>
            <h1 className='logo_name'>Chefis</h1>
        </div>
    )
}
