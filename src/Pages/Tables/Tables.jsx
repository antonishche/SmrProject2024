import React, { useState, useRef, useEffect } from 'react'
import './Tables.scss'
import { v4 as uuid } from 'uuid'
import TopPanel from '../../Components/TopPanel/TopPanel';
import { useAuth } from '../../hooks/use-auth';
import { useDispatch } from 'react-redux'
import { setTable } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Tables() {

    const { isData, place, guests } = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const arrNum = {
        firstColumn: [1, 2, 3],
        secondColumn: [4, 5, 6],
        thirdColumn: [7],
        fourthColumn: [8, 9],
        fivethColumn: [10],
    }

    let ref = useRef(false)

    const [err, setErr] = useState(false);

    function subForm(e) {
        e.preventDefault()
        dispatch(setTable({
            table: ref.current,
        }))
        navigate('/sub-reserv')
    }

    useEffect(() => {
        if (isData) {
            return
        }
        navigate('/reserv')
    }, [])

    function handleClick() {
        if (!ref.current) {
            setErr(true)
            return;
        } else {
            setErr(false)
        }
        dispatch(setTable({
            table: ref.current,
        }))
        navigate('/sub-reserv')
    }

    function subForm(e) {
        e.preventDefault()

    }

    return (
        <div className="container">
            <TopPanel link={'/reserv'} />
            <div className="cont_tables" onSubmit={subForm}>
                <div className="row">
                    <div className='column'>
                        <div className="row" style={{gap: '30px'}}>
                            <div className="column">
                                {arrNum.firstColumn.map(el => {
                                    return (
                                        <div key={uuid()} className={place == 'Внутри' ? "table" : 'table_box'}>
                                            <div className="grid-balls">
                                                <div className="cher one"></div>
                                                <div className="cher two"></div>
                                                <div className="cher three"></div>
                                                <div className="cher four"></div>
                                            </div>
                                            <input disabled={guests > 4} onChange={(e) => ref.current = e.target.value} id={"radio-" + el} type="radio" name="radio" value={el} />
                                            <label htmlFor={"radio-" + el}><p>{el}</p></label>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="column">
                                {arrNum.secondColumn.map(el => {
                                    return (
                                        <div key={uuid()} className={place == 'Внутри' ? "table" : 'table_box'}>
                                            <div className="grid-balls">
                                                <div className="cher one"></div>
                                                <div className="cher two"></div>
                                                <div className="cher three"></div>
                                                <div className="cher four"></div>
                                            </div>
                                            <input disabled={guests > 4} onChange={(e) => ref.current = e.target.value} id={"radio-" + el} type="radio" name="radio" value={el} />
                                            <label htmlFor={"radio-" + el}><p>{el}</p></label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        {arrNum.thirdColumn.map(el => {
                            return (
                                <div key={uuid()} style={{alignSelf: 'flex-start'}} className="big_table">
                                    <div className="grid-balls">
                                        <div className="cher one"></div>
                                        <div className="cher two"></div>
                                        <div className="cher three"></div>
                                        <div className="cher four"></div>
                                        <div className="cher five"></div>
                                        <div className="cher six"></div>
                                    </div>
                                    <input disabled={guests < 5} onChange={(e) => ref.current = e.target.value} id={"radio-" + el} type="radio" name="radio" value={el} />
                                    <label htmlFor={"radio-" + el}><p>{el}</p></label>
                                </div>
                            )
                        })}
                    </div>
                    <div className="column">
                        <div className="column">
                            {arrNum.fourthColumn.map(el => {
                                return (
                                    <div key={uuid()} style={{marginTop: '15px'}} className={place == 'Внутри' ? "table reverse" : 'table_box'}>
                                        <div className="grid-balls">
                                            <div className="cher one"></div>
                                            <div className="cher two"></div>
                                            <div className="cher three"></div>
                                            <div className="cher four"></div>
                                        </div>
                                        <input disabled={guests > 4} onChange={(e) => ref.current = e.target.value} id={"radio-" + el} type="radio" name="radio" value={el} />
                                        <label htmlFor={"radio-" + el}><p>{el}</p></label>
                                    </div>
                                )
                            })}
                        </div>
                        {arrNum.fivethColumn.map(el => {
                            return (
                                <div key={uuid()} style={{marginTop: '30px'}} className="big_table reverse">
                                    <div className="grid-balls">
                                        <div className="cher one"></div>
                                        <div className="cher two"></div>
                                        <div className="cher three"></div>
                                        <div className="cher four"></div>
                                        <div className="cher five"></div>
                                        <div className="cher six"></div>
                                    </div>
                                    <input disabled={guests < 5} onChange={(e) => ref.current = e.target.value} id={"radio-" + el} type="radio" name="radio" value={el} />
                                    <label htmlFor={"radio-" + el}><p>{el}</p></label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {err && <p style={{ color: 'red' }}>Выберите стол</p>}
                <button onClick={handleClick} type='submit' style={{ width: '86%' }} className="big_btn">Далее</button>
            </div>
        </div>
    )
}
