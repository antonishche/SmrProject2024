import './Catering.scss'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import TopPanel from '../../Components/TopPanel/TopPanel';
import Loading from '../../Components/Loading/Loading';
import { ref, get, set } from "firebase/database";
import { db } from '../../main';

export default function Catering() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [startReserv, setStartReserv] = useState(false)
  const [chooseWay, setChooseWay] = useState(false)
  const [data, setData] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/onboarding')
        return
      } else {
        get(ref(db, 'users/catering/' + auth.currentUser.uid)).then((snapshot) => {
          if (snapshot.exists() && snapshot.child !== null) {
            setData(snapshot.val());
          }
          setLoading(false)
        }).catch((error) => {
          console.log(error);
          setLoading(false)
        });
      }
    })
  }, [auth.currentUser])

  function removeReserv() {
    setLoading(true)
    sessionStorage.setItem('cater', JSON.stringify({}))
    set(ref(db, 'users/catering/' + auth.currentUser.uid), {
      data: null,
      guests: null,
    })
      .then(() => {
        setData(false)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      });
  }

  function btnBrains() {
    setChooseWay(false)
    setStartReserv(!startReserv)
  }

  function unrenderBlackBox() {
    setStartReserv(false)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="container_catering">
      <TopPanel color='green' name='Chefis' link='/menu' />
      {!startReserv && <button className='start_reserv' onClick={btnBrains}>CATERING</button>}
      {!data && <div className={!startReserv ? 'black_box' : "active black_box"}>
        <div className="logo_name_box">
          <div className='go_back' onClick={unrenderBlackBox}><p className='arr_transform'>{'<'}</p></div>
        </div>
        <p>Заказы принимаются <br />минимум <br />за <i style={{ color: 'red' }}>2 дня</i></p>
        <div onClick={() => { sessionStorage.setItem('way', 'table'); navigate('/cater') }} className='cube_btn'>Продолжить</div>
      </div>}
      {data && <div className={!startReserv ? 'black_box' : "active black_box"}>
        <div className="logo_name_box">
          <div className='go_back' onClick={unrenderBlackBox}><p className='arr_transform'>{'<'}</p></div>
        </div>
        <div className="data_holder">
          <h2>Catering is ready</h2>
          <button className='del_inf' onClick={removeReserv}><p>+</p></button>
        </div>
        <div className="data_holder">
          <p>Дата:</p>
          <p>{data.data.slice(0,10)}</p>
        </div>
        <div className="data_holder">
          <p>Время:</p>
          <p>{data.data.slice(11)}</p>
        </div>
        <div className="data_holder">
          <p>Гости:</p>
          <p>{data.guests}</p>
        </div>
      </div>}
    </div>
  )
}