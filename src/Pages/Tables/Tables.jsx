import React, { useState, useRef, useEffect } from 'react'
import './Tables.scss'
import { v4 as uuid } from 'uuid'
import TopPanel from '../../Components/TopPanel/TopPanel';
import { useAuth } from '../../hooks/use-auth';
import { useDispatch } from 'react-redux'
import { setTable } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Tables() {

    const {isData} = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const arrNum = {
        firstColumn: [1, 2, 3, 4],
        secondColumn: [5, 6, 7, 8],
        thirdColumn: [9, 10, 11, 12],
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

      useEffect(()=>{
        if (isData) {
            return
        }
        navigate('/reserv')
      }, [])

    function handleClick() {
        console.log(ref.current);
        if (!ref.current) {
            setErr(true)
            return;
        }else{
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
                <div className="table_columns">
                    <div className="two_col">
                        <div className="column">
                            {arrNum.firstColumn.map(el => {
                                return (
                                    <div key={uuid()} className="table">
                                        <div className="cher one"></div>
                                        <div className="cher two"></div>
                                        <div className="cher three"></div>
                                        <div className="cher four"></div>
                                        <input onChange={(e)=>ref.current = e.target.value} id={"radio-" + el} type="radio" name="radio" value={el}/>
                                        <label htmlFor={"radio-" + el}>{el}</label>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="column">
                            {arrNum.secondColumn.map(el => {
                                return (
                                    <div key={uuid()} className="table">
                                        <div className="cher one"></div>
                                        <div className="cher two"></div>
                                        <div className="cher three"></div>
                                        <div className="cher four"></div>
                                        <input onChange={(e)=>{ref.current = e.target.value;console.log(ref.current)}} id={"radio-" + el} type="radio" name="radio" value={el} required/>
                                        <label htmlFor={"radio-" + el}>{el}</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="one_col">
                        <div className="column">
                            {arrNum.thirdColumn.map(el => {
                                return (
                                    <div key={uuid()} className="table">
                                        <div className="cher five"></div>
                                        <div className="cher six"></div>
                                        <div className="cher seven"></div>
                                        <div className="cher eight"></div>
                                        <input onChange={(e)=>{ref.current = e.target.value;console.log(ref.current)}} id={"radio-" + el} type="radio" name="radio" value={el} required/>
                                        <label htmlFor={"radio-" + el}><p>{el}</p></label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                {err && <p style={{color: 'red'}}>Выберите стол</p>}
                <button onClick={handleClick} type='submit' className="big_btn">Далее</button>
            </div>
        </div>
    )
}
