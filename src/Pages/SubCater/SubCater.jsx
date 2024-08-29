import React, { useState, useEffect} from 'react'
import './SubCater.scss'
import { getAuth } from 'firebase/auth';
import TopPanel from '../../Components/TopPanel/TopPanel';
import { useNavigate } from 'react-router-dom';
import { ref, set } from "firebase/database";
import { db } from '../../main';
import Loading from '../../Components/Loading/Loading';

export default function SubCater() {
    
    const arrow = "<";
    const navigate = useNavigate()
    const auth = getAuth()
    const [loading, setLoading] = useState(false)
    const [onProcess, setOnProcess] = useState(true)
    const cater = JSON.parse(sessionStorage.getItem('cater'))

    useEffect(()=>{
        setLoading(true)
        if (!cater) {
            navigate('/cater')
        }
        setLoading(false)
    })

    function writeUserData() {
        setLoading(true)
        set(ref(db, 'users/catering/' + auth.currentUser.uid), {
            data: cater.date,
            guests : cater.guests,
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
        <p className='cater_p'>Ресторан будет уведомлен, и мы свяжемся с вами, чтобы подтвердить ваш заказ.</p>
            <div className='between'>
                <p>Дата:</p>
                <p>{cater.date.slice(0,10)}</p>
            </div>
            <hr />
            <div className='between'>
                <p>Время:</p>
                <p>{cater.date.slice(11)}</p>
            </div>
            <hr />
            <div className='between'>
                <p>Место:</p>
                <p>{cater.guests}</p>
            </div>
            <hr />
            <button className="big_btn" onClick={writeUserData}>Подтвердить</button>
        </div>}
        {!onProcess && <div className="logo_name_box">
            <div onClick={() => setOnProcess(!onProcess)} className='go_back'><p className='arr_transform'>{arrow}</p></div>
            <div className='cros' onClick={()=>navigate('/catering')}>+</div>
        </div>}
        {!onProcess && <div className='info_reserv'>
            <h1 style={{fontSize: '25px', margin: '0 auto', textAlign: 'center'}}>Спасибо за<br /> размещние заказа</h1>
            <div className="yes"></div>
            <div className='net'>
                <p style={{color: 'rgb(143, 143, 143)'}}>Мы скоро свяжемся с вами.</p>
                <p>НОМЕР ЗАКАЗА ID: ID457</p>
            </div>
        </div>}
    </div>
  )
}

