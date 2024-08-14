import React, { useState } from 'react'
import './Menu.scss'
import { Link } from 'react-router-dom'
import food from '../../food.json'
import { v4 as uuid } from 'uuid'
import Modal from '../../Components/Modal/Modal'

export default function Menu() {
  const arrow = "<";
  const [sorce, setSorce] = useState('')
  const [active, setActive] = useState(false)
  const [base, setBase] = useState(true)
  const [modal, setModal] = useState(false)
  const [element, setElement] = useState()
  const [name, setName] = useState('Chefis menu')
  const [valueForModal, setValueForModal] = useState('')
  return (
    <div className="container">
      <div className={!active ? "absolut hidden" : "absolut onlook"}>
        <div className="leftside_menu" onClick={()=>setActive(active)}>
          <div className='links'>
            <Link className='smart_link' to={'/profile'}>
              <p>Профиль</p>
              <p className='go'>→</p>
            </Link>
            <Link className='smart_link' >Кейтеринг</Link>
            <Link to={'/description'} className='smart_link'>
              <p>О нас</p>
              <p className='go'>→</p>
            </Link>
            <Link to={'/contacts'} className='smart_link' >
              <p>Контакты</p>
              <p className='go'>→</p>
            </Link>
          </div>
        </div>
        <div className="rightside_bar" onClick={() => setActive(!active)}></div>
      </div>
      <div className="black">
        <div className="logo_name_box">
          {!base && <div className='go_back' onClick={() => { setBase(!base); setName('Chefis menu') }}><p className='arr_transform'>{arrow}</p></div>}
          {base && <Link className='go_back' to={'/'}><p className='arr_transform'>{arrow}</p></Link>}
          <h1 className='logo_name'>{name}</h1>
          <div className="bar_menu" onClick={() => {setActive(!active)}}>
                <div className={!active ? "line" : "line line1"}></div>
                <div className={!active ? "line" : "line line2"}></div>
                <div className={!active ? "line" : "line line3"}></div>
            </div>
        </div>
      </div>
      {base && <div className="container_menu">
        {food.map(el => {
          return (
            <div key={uuid()} onClick={() => { setSorce(el.souce); setBase(!base); setName(el.name) }} style={{ backgroundImage: 'url(' + el.image + ')' }} className="food_box">
              <h2>{el.name}</h2>
            </div>
          )
        })}
      </div>}
      {!base && <div className="container_menu">
        {sorce.length !== 0 && sorce.map(el => {
          return (
            <div key={uuid()} onClick={() => { setElement(el); setModal(true); setValueForModal(el); }} style={{ backgroundImage: 'url(' + el.image + ')' }} className="food_box">
              <h2>{el.name}</h2>
            </div>
          )
        })}
        {sorce.length == 0 && <p className='no_res'>Извините, <br />Позиция пока недоступна</p>}
      </div>}
      {modal && <Modal set={setModal} el={element} />}
      <div className="black_bottom"></div>
    </div>
  )
}
