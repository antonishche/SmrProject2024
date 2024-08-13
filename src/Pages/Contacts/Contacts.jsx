import React from 'react'
import './Contacts.scss'
import TopPanel from '../../Components/TopPanel/TopPanel'

export default function Contacts() {
  return (
    <div className="container">
      <TopPanel link={'/menu'} name={'Chefis'} />
      <div className="info_box">
        <div className="adres">
          <p>Адрес г. Минск<br />Неминга 4</p>
        </div>
        <div className="contacts">
          <p>Контакты<br />+375 29 567 34 56<br />+375 44 578 09 67</p>
        </div>
        <div className="time_table">
          <p>Время работы <br />пн-чт 12:00-23:00<br /> пт-вс 12:00-00:00</p>
        </div>
        <div className="digital">
          <img src="facebook.png" alt="" />
          <img src="instagram.png" alt="" />
        </div>
      </div>
    </div>
  )
}
