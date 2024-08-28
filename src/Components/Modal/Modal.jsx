import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ref, get } from "firebase/database";
import { db } from '../../main';
import { getAuth } from 'firebase/auth';
import './Modal.scss'
import Loading from '../Loading/Loading';

export default function Modal(props) {
    const arrow = "<";
    const elem = props.el
    const navigate = useNavigate()
    const basket = JSON.parse(localStorage.getItem('basketFood'))
    const auth = getAuth()
    const user = auth.currentUser

    const [count, setCount] = useState(1)
    const [cal, setCal] = useState(elem.kcal)
    const [active, setActive] = useState('small')
    const [cost, setCost] = useState(elem.cost)
    const [activeDescr, setActiveDescr] = useState(false)
    const [bought, setBought] = useState(false)
    const [loading, setLoading] = useState(false)
    const [reserved, setReserved] = useState(false)

    useEffect(() => {
        setLoading(true)
        if (basket.length) {
            basket.forEach(element => {
                if (element.souce.name == elem.name && element.souce.type == elem.type && element.size == active) {
                    setBought(true)
                }
            });
        }
        get(ref(db, 'users/food/' + user.uid)).then((snapshot) => {
            if (snapshot.exists() && snapshot.child !== null) {
                setReserved(true)
            }
            setLoading(false)
        }).catch((error) => {
            console.log(error);
            setLoading(false)
        });
    }, [user])

    function basketLogic() {
        const arrPush = {
            souce: elem,
            count: count,
            size: active
        }
        basket.push(arrPush)
        localStorage.setItem('basketFood', JSON.stringify(basket))
        setBought(true)
    }
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
    function small() {
        setBought(false)
        const newAar = JSON.parse(localStorage.getItem('basketFood'))
        newAar.forEach(element => {
            if (element.souce.name == elem.name && element.souce.type == elem.type && element.size == 'small') {
                setBought(true)
                return
            }
        });
    }
    function medium() {
        setBought(false)
        const newAar = JSON.parse(localStorage.getItem('basketFood'))
        newAar.forEach(element => {
            if (element.souce.name == elem.name && element.souce.type == elem.type && element.size == 'medium') {
                setBought(true)
                return
            }
        });
    }
    function big() {
        setBought(false)
        const newAar = JSON.parse(localStorage.getItem('basketFood'))
        newAar.forEach(element => {
            if (element.souce.name == elem.name && element.souce.type == elem.type && element.size == 'big') {
                setBought(true)
                return
            }
        });
    }

    if (loading) {
        return <Loading />
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
                {!bought && <div className="counter">
                    <button className='count_btn' onClick={minus}>-</button>
                    <div className='number'>{count}</div>
                    <button className='count_btn' onClick={plus}>+</button>
                </div>}
                {!bought && <div className="cost">{cost * count + ' р.'}</div>}
            </div>
            <div className="total">
                {!bought && <p>Калории</p>}
                {!bought && <div className="cal">{cal * count + ' kcal'}</div>}
            </div>
            <div className="total">
                <button onClick={() => { setActive('small'); setCost(elem.cost); setCal(elem.kcal); small() }} className={active == 'small' ? "active size" : "passive size"}>small</button>
                <button onClick={() => { setActive('medium'); setCost(Math.trunc(elem.cost * elem.multiplier)); setCal(Math.trunc(elem.kcal * elem.multiplier)); medium() }} className={active == 'medium' ? "active size" : "passive size"}>medium</button>
                <button onClick={() => { setActive('big'); setCost(Math.trunc(elem.cost * elem.multiplier * elem.multiplier)); setCal(Math.trunc(elem.kcal * elem.multiplier * elem.multiplier)); big() }} className={active == 'big' ? "active size" : "passive size"}>big</button>
            </div>
            <div className="total" style={{flexWrap: 'wrap'}}>
                <div className="descr" onClick={() => setActiveDescr(!activeDescr)}>Состав</div>
                {!bought && <img className='basket' onClick={basketLogic} src={'basket.png'} alt="" />}
                {bought && <h2 className='in_basket' onClick={() => navigate('/basket')}>В корзине</h2>}
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
