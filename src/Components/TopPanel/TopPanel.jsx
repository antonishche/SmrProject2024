import React, { useState, useEffect } from 'react'
import './TopPanel.scss'
import { Link } from 'react-router-dom';

export default function TopPanel(props) {

    const arrow = "<";

    const [green, setGreen] = useState(false)

    useEffect(()=>{
        if (props.color === 'green') {
            setGreen(true)
        }
    }, [])

    return (
        <div className="logo_name_box">
            <Link className={green ? 'green' : 'go_back'} to={props.link}><p className='arr_transform'>{arrow}</p></Link>
            <h1 className='logo_name'>{props.name}</h1>
        </div>
    )
}
