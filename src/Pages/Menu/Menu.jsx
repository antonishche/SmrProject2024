import React, { useState } from 'react'
import './Menu.scss'
import { useNavigate } from 'react-router-dom'
import food from '../../food.json'
import Modal from '../../Components/Modal/Modal'
import BottomPanel from '../../Components/BottomPanel/BottomPanel'

export default function Menu() {
  const arrow = "<";
  const [sorce, setSorce] = useState('')
  const [active, setActive] = useState(false)
  const [base, setBase] = useState(true)
  const [modal, setModal] = useState(false)
  const [element, setElement] = useState()
  const [name, setName] = useState('Chefis menu')
  const navigate = useNavigate()
  return (
    <div className="container">
      <div className={!active ? "absolut hidden" : "absolut onlook"}>
        <div className="leftside_menu" onClick={() => setActive(active)}>
          <div className='links'>
            <div onClick={() => navigate('/profile')} className='smart_link'>
              <p>Профиль</p>
              <p className='go'>→</p>
            </div>
            <div onClick={() => navigate('/catering')} className='smart_link' >
              <p>Кейтеринг</p>
              <p className='go'>→</p>
            </div>
            <div onClick={() => navigate('/description')} className='smart_link'>
              <p>О нас</p>
              <p className='go'>→</p>
            </div>
            <div onClick={() => navigate('/contacts')} className='smart_link' >
              <p>Контакты</p>
              <p className='go'>→</p>
            </div>
            <div onClick={() => navigate('/pay')} className='smart_link' >
              <p>Способ оплаты</p>
              <p className='go'>→</p>
            </div>
          </div>
        </div>
        <div className="rightside_bar" onClick={() => setActive(!active)}></div>
      </div>
      <div className="logo_name_box">
        {!base && <div className='go_back' onClick={() => { setBase(!base); setName('Chefis menu') }}><p className='arr_transform'>{arrow}</p></div>}
        {base && <div onClick={() => navigate('/')} className='go_back'><p className='arr_transform'>{arrow}</p></div>}
        <h1 className='logo_name'>{name}</h1>
        <div className="bar_menu" onClick={() => { setActive(!active) }}>
          <div className={!active ? "line" : "line line1"}></div>
          <div className={!active ? "line" : "line line2"}></div>
          <div className={!active ? "line" : "line line3"}></div>
        </div>
      </div>
      {base && <div className="container_menu">
        {food.map(el => {
          return (
            <div key={el.id} onClick={() => { setSorce(el.souce); setBase(!base); setName(el.name) }} style={{ backgroundImage: 'url(' + el.image + ')' }} className="food_box">
              <h2>{el.name}</h2>
            </div>
          )
        })}
      </div>}
      {!base && <div className="container_menu">
        {sorce.length !== 0 && sorce.map(el => {
          return (
            <div key={el.id} onClick={() => { setElement(el); setModal(true); }} style={{ backgroundImage: 'url(' + el.image + ')' }} className="food_box">
              <h2>{el.name}</h2>
            </div>
          )
        })}
        {sorce.length == 0 && <p className='no_res'>Извините, <br />Позиция пока недоступна</p>}
      </div>}
      {modal && <Modal set={setModal} el={element} />}
      <BottomPanel />
    </div>
  )
}
