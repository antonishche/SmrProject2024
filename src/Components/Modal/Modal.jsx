import React, { useState, useEffect } from 'react'
import './Modal.scss'

export default function Modal(props) {
    const arrow = "<";
    console.log(props);
    const elem = props.el
    const [count, setCount] = useState(1)
    const [cal, setCal] = useState(elem.kcal)
    const [active, setActive] = useState('small')
    const [cost, setCost] = useState(elem.cost)
    const [activeDescr, setActiveDescr] = useState(false)
    function plus() {
        if (count == 5) {
            return
        }
        setCount(count + 1)
    }
    function minus() {
        if (count == 1) {
            props.set(false)
            return
        }
        setCount(count - 1)
    }
    return (
        <div className='modal'>
            <div className="img" style={{ backgroundImage: 'url(' + elem.image + ')' }}></div>
            <div className="logo_name_box">
                <div onClick={() => props.set(false)} className='go_back'><p className='arr_transform'>{arrow}</p></div>
            </div>
            <div className="basic">
                <div className="type">{elem.type}</div>
                <div className="name">{elem.name}</div>
            </div>
            <div className="total">
                <div className="counter">
                    <button className='count_btn' onClick={minus}>-</button>
                    <div className='number'>{count}</div>
                    <button className='count_btn' onClick={plus}>+</button>
                </div>
                <div className="cost">{cost * count + ' р.'}</div>
            </div>
            <div className="total">
                <p>Калории</p>
                <div className="cal">{cal * count + ' kcal'}</div>
            </div>
            <div className="total">
                <button onClick={() => { setActive('small'); setCost(elem.cost); setCal(elem.kcal) }} className={active == 'small' ? "active size" : "passive size"}>small</button>
                <button onClick={() => { setActive('medium'); setCost(Math.trunc(elem.cost * elem.multiplier)); setCal(Math.trunc(elem.kcal * elem.multiplier)) }} className={active == 'medium' ? "active size" : "passive size"}>medium</button>
                <button onClick={() => { setActive('big'); setCost(Math.trunc(elem.cost * elem.multiplier * elem.multiplier)); setCal(Math.trunc(elem.kcal * elem.multiplier * elem.multiplier)) }} className={active == 'big' ? "active size" : "passive size"}>big</button>
            </div>
            <div className="total">
                <div className="descr" onClick={() => setActiveDescr(!activeDescr)}>Состав</div>
                <img className='basket' src={'basket.png'} alt="" />
            </div>
            {activeDescr && <div className="modal_descr">
                <div className="text">
                    <div className="logo_name_box">
                        <div onClick={() => setActiveDescr(!activeDescr)} className='go_back'><p className='arr_transform'>{arrow}</p></div>
                    </div>
                    <p>{elem.descr}</p>
                </div>
            </div>}
        </div>
    )
}
