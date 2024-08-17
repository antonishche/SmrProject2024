import React, { useState, useEffect} from 'react'
import './SubReserv.scss'
import { getAuth } from 'firebase/auth';
import { useAuth } from '../../hooks/use-auth';
import TopPanel from '../../Components/TopPanel/TopPanel';
import { useNavigate } from 'react-router-dom';
import { ref, set } from "firebase/database";
import { db } from '../../main';
import Loading from '../../Components/Loading/Loading';

export default function SubReserv() {
    
    const arrow = "<";
    const {place, data, guests, table, isTable} = useAuth()
    const navigate = useNavigate()
    const auth = getAuth()
    const [loading, setLoading] = useState(false)
    const [onProcess, setOnProcess] = useState(true)
    const way = sessionStorage.getItem('way')

    useEffect(()=>{
        if (isTable) {
            return
        }
        navigate('/reserv')
    })

    function writeUserData() {
        setLoading(true)
        set(ref(db, 'users/reservation/' + auth.currentUser.uid), {
            place: place,
            data: data,
            guests : guests,
            table: table,
        })
        .then(() => {
            setOnProcess(false)
            setLoading(false)
          })
          .catch((error) => {
            console.log(error);
            setLoading(false)
          });
      }

      if (loading) {
        return <Loading/>
      }

  return (
    <div className="container">
        {onProcess && <TopPanel link={'/tables'}/>}
        {onProcess && <div className="info_reserv">
        <h2>Подтвердить <br />бронироование?</h2>
            <div className='between'>
                <p>Дата:</p>
                <p>{data}</p>
            </div>
            <hr />
            <div className='between'>
                <p>Место:</p>
                <p>{place}</p>
            </div>
            <hr />
            <div className='between'>
                <p>Кол-во гостей:</p>
                <p>{guests}</p>
            </div>
            <hr />
            <div className='between'>
                <p>Номер столика:</p>
                <p>{table}</p>
            </div>
            <button className="big_btn" onClick={writeUserData}>Подтвердить</button>
        </div>}
        {!onProcess && <div className="logo_name_box">
            <div onClick={() => setOnProcess(!onProcess)} className='go_back'><p className='arr_transform'>{arrow}</p></div>
        </div>}
        {!onProcess && <div className='info_reserv'>
            <h2><p>Success</p> <br />Ваш столик зарезервирован</h2>   
            <h2>Примечание:<br/> Бронирование только <br/>на 2 часа</h2>
            {way == 'table' && <div className="big_btn" onClick={()=>navigate('/payment')}>Перейти к оплате</div>}
            {way == 'table_menu' && <div className="big_btn" onClick={()=>navigate('/menu')}>Заказать блюдо</div>}
        </div>}
    </div>
  )
}
