import './HomePage.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import TopPanel from '../../Components/TopPanel/TopPanel';

export default function Reservation() {

  const auth = getAuth();
  const navigate = useNavigate();

  const [startReserv, setStartReserv] = useState(false)
  const [chooseWay, setChooseWay] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/onboarding')
        return
      }
    })
  }, [])

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

  return (
    <div className="container_reservation">
      <TopPanel color={'green'} name='Chefis' link='/menu'/>
      <div className={startReserv ? "self_unrender" : 'none'} onClick={unrenderBlackBox}></div>
      <button className='start_reserv' onClick={btnBrains}>RESERVE A TABLE</button>
      <div className={!startReserv ? 'black_box' : "active black_box"}>
        {!chooseWay && <h2>No reservation yet</h2>}
        {!chooseWay && <button className='add_reserv' onClick={changeItems}>+</button>}
        {!chooseWay && <p>Предоплата столика <br /> 50 рублей</p>}
        {chooseWay && <Link to='/reserv' className='cube_btn'>Бронирование столика</Link>}
        {chooseWay && <Link to='/reserv' className='cube_btn'>Бронирование столика <br /> + меню</Link>}
      </div>
    </div>
  )
}
