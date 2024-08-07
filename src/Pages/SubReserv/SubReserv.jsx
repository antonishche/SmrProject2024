import React, {useEffect} from 'react'
import './SubReserv.scss'
import { useAuth } from '../../hooks/use-auth';
import TopPanel from '../../Components/TopPanel/TopPanel';
import { Link, useNavigate } from 'react-router-dom';

export default function SubReserv() {
    
    const {place, data, guests, table, isTable} = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{
        if (isTable) {
            return
        }
        navigate('/reserv')
    })

  return (
    <div className="container">
        <TopPanel link={'/reserv'}/>
        <div className="info_reserv">
        <h2>Подтвердить <br />бронироование?</h2>
            <div className='between'>
                <p>Дата:</p>
                <p>{data}</p>
            </div>
            <div className='between'>
                <p>Место:</p>
                <p>{place}</p>
            </div>
            <div className='between'>
                <p>Кол-во гостей:</p>
                <p>{guests}</p>
            </div>
            <div className='between'>
                <p>Номер столика:</p>
                <p>{table}</p>
            </div>
            <Link to={'/profile'} className="big_btn">Подтвердить</Link>
        </div>
    </div>
  )
}
