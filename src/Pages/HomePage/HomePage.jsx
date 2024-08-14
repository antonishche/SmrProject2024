import './HomePage.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import TopPanel from '../../Components/TopPanel/TopPanel';
import Loading from '../../Components/Loading/Loading';
import { ref, get, set } from "firebase/database";
import { db } from '../../main';

export default function Reservation() {

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
        get(ref(db, 'users/reservation/' + auth.currentUser.uid)).then((snapshot) => {
          if (snapshot.exists() && snapshot.child !== null) {
            setData(snapshot.val());
            setLoading(false)
          } else {
            setLoading(false)
          }
        }).catch((error) => {
          console.error(error);
          setLoading(false)
        });
      }
    })
  }, [auth.currentUser])

  function removeReserv() {
    setLoading(true)
    set(ref(db, 'users/reservation/' + auth.currentUser.uid), {
      place: null,
      data: null,
      guests: null,
      table: null,
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

  function changeItems() {
    setChooseWay(!chooseWay)
  }

  function btnBrains() {
    setChooseWay(false)
    setStartReserv(!startReserv)
  }

  function unrenderBlackBox() {
    setStartReserv(false)
  }

  if (loading) {
    return <Loading/>
  }

  return (
    <div className="container_reservation">
      <TopPanel color={'green'} name='Chefis' link='/menu' />
      <div className={startReserv ? "self_unrender" : 'none'} onClick={unrenderBlackBox}></div>
      <button className='start_reserv' onClick={btnBrains}>RESERVE A TABLE</button>
      {!data && <div className={!startReserv ? 'black_box' : "active black_box"}>
        {!chooseWay && <h2>No reservation yet</h2>}
        {!chooseWay && <button className='add_reserv' onClick={changeItems}>+</button>}
        {!chooseWay && <p>Предоплата столика <br /> 50 рублей</p>}
        {chooseWay && <Link to='/reserv' className='cube_btn'>Бронирование столика</Link>}
        {chooseWay && <Link to='/reserv' className='cube_btn'>Бронирование столика <br /> + меню</Link>}
      </div>}
      {data && <div className={!startReserv ? 'black_box' : "active black_box"}>
        <div className="data_holder">
          <h2>Reservation is ready</h2>
          <button className='del_inf' onClick={removeReserv}><p>+</p></button>
        </div>
        <div className="data_holder">
          <p>Дата:</p>
          <p>{data.data}</p>
        </div>
        <div className="data_holder">
          <p>Место:</p>
          <p>{data.place}</p>
        </div>
        <div className="data_holder">
          <p>Столик:</p>
          <p>{data.table}</p>
        </div>
        <div className="data_holder">
          <p>Гости:</p>
          <p>{data.guests}</p>
        </div>
      </div>}
    </div>
  )
}
