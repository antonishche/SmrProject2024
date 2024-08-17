import React, { useState, useEffect } from 'react'
import './Basket.scss'
import TopPanel from './../TopPanel/TopPanel';
import BottomPanel from './..//BottomPanel/BottomPanel';
import BasketBox from '../BasketBox/BasketBox';

export default function Basket() {
  const basketFood = JSON.parse(localStorage.getItem('basketFood'))
  const [stateBasket, setStateBasket] = useState(basketFood)
  const [totalCost, setTotalCost] = useState(0)
  function clarBasket() {
    setStateBasket([])
    localStorage.setItem('basketFood', JSON.stringify([]))
  }
  function buyProducts() {
  }
  function getTotal() {
    stateBasket.forEach((el)=>{
      if (el.size == 'small') {
        setTotalCost(totalCost+el.souce.cost*el.count)
        return
    }else if (el.size == 'medium') {
      setTotalCost(totalCost+Math.trunc(el.souce.cost * el.souce.multiplier*el.count))
        return
    }else if (el.size == 'big') {
      setTotalCost(totalCost+Math.trunc(el.souce.cost * el.souce.multiplier * el.souce.multiplier*el.count))
        return
    }
    })
  }
  
  return (
    <div className="container">
      <TopPanel name={'Корзина'} />
      <div className="container_menu">
        {stateBasket.length !== 0 && stateBasket.map((el) => {
          return <BasketBox el={el} key={el.souce.type+el.souce.name+el.size} basket={stateBasket} set={setStateBasket}/>
        })}
        {stateBasket.length !== 0 && <div className="nav_helper">
          <button onClick={clarBasket} className='clear_basket'>Очистить</button>
          <button onClick={buyProducts} className='buy_products'>Оформить</button>
        </div> }
        {stateBasket.length == 0 && <h2 className='empty'>Корзина пуста</h2>}
      </div>
      <BottomPanel />
    </div>
  )
}
