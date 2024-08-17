import React, { useState, useEffect } from 'react'
import './TopPanel.scss'
import { Link, useNavigate } from 'react-router-dom';

export default function TopPanel(props) {

    const arrow = "<";
    const navigate = useNavigate()
    const [green, setGreen] = useState(false)
    const [link, setLink] = useState(false)

    useEffect(() => {
        if (props.color === 'green') {
            setGreen(true)
        }
        if (props.link == '/onboarding' || props.link == '/menu') {
            setLink(true)
        }
    }, [])

    return (
        <div className="logo_name_box">
            {!link && <div className={green ? 'green' : 'go_back'} onClick={()=>navigate(-1)}><p className='arr_transform'>{arrow}</p></div>}
            {link && <Link to={props.link} className={green ? 'green' : 'go_back'}><p className='arr_transform'>{arrow}</p></Link>}
            <h1 className='logo_name'>{props.name}</h1>
        </div>
    )
}
