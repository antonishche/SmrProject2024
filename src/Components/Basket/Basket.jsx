import React, { useState, useEffect } from 'react'
import './Basket.scss'
import { useNavigate } from 'react-router-dom';
import TopPanel from './../TopPanel/TopPanel';
import BottomPanel from './..//BottomPanel/BottomPanel';
import BasketBox from '../BasketBox/BasketBox';
import { getAuth } from 'firebase/auth';
import { ref, get } from "firebase/database";
import Loading from '../Loading/Loading';
import { db } from '../../main';

export default function Basket() {
  const basketFood = JSON.parse(localStorage.getItem('basketFood'))
  const [stateBasket, setStateBasket] = useState(basketFood)
  const [notReservated, setNotReservated] = useState(false)
  const [loading, setLoading] = useState(false)
  const auth = getAuth()
  const navigate = useNavigate()
  function clarBasket() {
    setStateBasket([])
    localStorage.setItem('basketFood', JSON.stringify([]))
  }
  function buyProducts() {
    setLoading(true)
    get(ref(db, 'users/reservation/' + auth.currentUser.uid)).then((snapshot) => {
      if (snapshot.exists() && snapshot.child !== null) {
        navigate('/payment')
        setLoading(false)
      } else {
        setNotReservated(true)
        setLoading(false)
      }
    }).catch((error) => {
      console.error(error);
      setLoading(false)
    });
  }

  function minus(count, el) {
    if (count == 1) {
        const newBasket = basketFood.filter((n) => { return n !== el })
        setStateBasket(newBasket)
        localStorage.setItem('basketFood', JSON.stringify(newBasket))
        return
    }
    basketFood.forEach((elem) => {
        if (elem.souce.name === el.souce.name && elem.souce.type === el.souce.type && elem.size === el.size) {
            elem.count = elem.count - 1;
        }
    })
    localStorage.setItem('basketFood', JSON.stringify(basketFood))
}

function plus(count, el) {
  if (count == 5) {
      return
  }
  basketFood.forEach((elem) => {
      if (elem.souce.name === el.souce.name && elem.souce.type === el.souce.type && elem.size === el.size) {
          elem.count = elem.count + 1;
      }
  })
  localStorage.setItem('basketFood', JSON.stringify(basketFood))
}

  if (loading) {
    return <Loading />
  }

  return (
    <div className="container">
      {notReservated && <div className='not_res'>
        <div className="shaped">
          <div className="logo_name_box">
            <div className='go_back' onClick={() => setNotReservated(false)}><p className='arr_transform'>{'<'}</p></div>
          </div>
          <p>Вы не заказали столик</p>
          <button className='book' onClick={() => {navigate('/reserv');sessionStorage.setItem('way', 'table')}}>Заказать</button>
        </div>
      </div>}
      <TopPanel name={'Корзина'} />
      <div className="container_menu" style={{}}>
        {stateBasket.length !== 0 && stateBasket.map((el) => {
          return <BasketBox el={el} minus={minus} plus={plus} key={el.souce.type + el.souce.name + el.size} basket={stateBasket} set={setStateBasket} />
        })}
        {stateBasket.length !== 0 && <div className="nav_helper">
          <button onClick={clarBasket} className='clear_basket'>Очистить</button>
          <button onClick={buyProducts} className='buy_products'>Оформить</button>
        </div>}
        {stateBasket.length == 0 && <h2 className='empty'>Пусто</h2>}
      </div>
      <BottomPanel />
    </div>
  )
}
