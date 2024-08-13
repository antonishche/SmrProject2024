import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Burger.scss'

export default function Burger() {

    const [active, setActive] = useState(false)

    return (
        <>
            <div className="bar_menu" onClick={() => setActive(!active)}>
                <div className={!active ? "line" : "line line1"}></div>
                <div className={!active ? "line" : "line line2"}></div>
                <div className={!active ? "line" : "line line3"}></div>
            </div>
            <div className={!active ? "absolut hidden" : "absolut onlook"} onClick={() => setActive(!active)}>
                <div className="leftside_menu">
                    <div className='links'>
                        <Link className='smart_link' to={'/profile'}>
                            <p>Профиль</p>
                            <p className='go'>→</p>
                        </Link>
                        <Link className='smart_link' >Кейтеринг</Link>
                        <Link className='smart_link'>О нас</Link>
                        <Link to={'/contacts'} className='smart_link' >
                            <p>Контакты</p>
                            <p className='go'>→</p>
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}
