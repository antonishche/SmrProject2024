import './HomePage.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [seeMenu,setSeeMenu] = useState(false)
  const [modal, setModal] = useState(false)

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
          }
        }).catch((error) => {
          console.log(error);
        });
        get(ref(db, 'users/food/' + auth.currentUser.uid)).then((snapshot) => {
          if (snapshot.exists() && snapshot.child !== null) {
            setSeeMenu(snapshot.val())
            localStorage.setItem('basketFood', JSON.stringify(snapshot.val().basketFood))
          }
        }).catch((error) => {
          console.error(error);
        });
      }
    })
    setLoading(false)
  }, [])

  function removeReserv() {
    setLoading(true)
    setModal(!modal)
    localStorage.setItem('basketFood', JSON.stringify([]))
    set(ref(db, 'users/food/' + auth.currentUser.uid), {
      food: null,
    })
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
    return <Loading />
  }

  return <div>
    <div className="container_reservation">
      {modal && <div className="modal-home">
        <div className="mini_cont">
          <div className="logo_name_box">
          <div className='go_back' onClick={()=>setModal(!modal)}><p className='arr_transform'>{'<'}</p></div>
          </div>
          <p>Удалить заказ?</p>
          <div className="row">
            <button className="btn1" onClick={removeReserv}>Удалить</button>
            <button className="btn2" onClick={()=>setModal(!modal)}>Отмена</button>
          </div>
        </div>
      </div>}
      <TopPanel color={'green'} name='Chefis' link='/menu' />
      <div className={startReserv ? "self_unrender" : 'none'} onClick={unrenderBlackBox}></div>
      <button className='start_reserv' onClick={btnBrains}>RESERVE A TABLE</button>
      {!data && <div className={!startReserv ? 'black_box' : "active black_box"}>
        {!chooseWay && <h2>No reservation yet</h2>}
        {!chooseWay && <button className='add_reserv' onClick={changeItems}>+</button>}
        {!chooseWay && <p>Предоплата столика <br /> 50 рублей</p>}
        {chooseWay && <div onClick={() => { sessionStorage.setItem('way', 'table'); navigate('/reserv') }} style={{marginTop: '20px'}} className='cube_btn'>Бронирование столика</div>}
        {chooseWay && <div onClick={() => { sessionStorage.setItem('way', 'table_menu'); navigate('/reserv') }} className='cube_btn'>Бронирование столика <br /> + меню</div>}
      </div>}
      {data && <div className={!startReserv ? 'black_box' : "active black_box"}>
        <div className="data_holder">
          <h2>Reservation is ready</h2>
          <img src="trash.png" style={{cursor: 'pointer',color: 'white',width: '30px',height: '30px'}} alt="" onClick={()=>setModal(!modal)}/>
        </div>
        <div className="data_holder">
          <p>Дата:</p>
          <p>{data.data.slice(0,10) + ', ' + data.data.slice(11)}</p>
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
        {seeMenu && <button className='seeMenu' onClick={()=>navigate('/basket')}>→ Заказ ←</button>}
      </div>}
    </div>
  </div>
}
