import React, { useState } from 'react'
import './Reserv.scss'
import { useNavigate } from 'react-router-dom'
import TopPanel from '../../Components/TopPanel/TopPanel'
import Loading from '../../Components/Loading/Loading'
import { useDispatch } from 'react-redux'
import { setDataAndPlace } from '../../store/slices/userSlice';


export default function Reservation() {

  const [guests, setGuests] = useState(1)
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [place, setPlace] = useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch()

  function clickPlaceOutside() {
    setPlace('Снаружи');
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
  }

  function subForm(e) {
    e.preventDefault()
    dispatch(setDataAndPlace({
      data: selectedDateTime,
      guests: guests,
      place: place,
    }))
    navigate('/tables')
  }

  function clickPlaceInside() {
    setPlace('Внутри');
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
  }

  return (
    <div className='container_reserv' style={{ paddingTop: '15px' }}>
      <TopPanel name='' />
      <div className="reserv_form">
        <div className="input_box">
          <p>Выбрать дату и время</p>
          <input
            type="datetime-local"
            className={!selectedDateTime ? 'reserv_inp passive' : 'reserv_inp active'}
            value={selectedDateTime}
            onChange={(e) => setSelectedDateTime(e.target.value)}
          />
        </div>
        <div className="input_box">
          <p>Кол-во гостей?</p>
          <div className={!guests ? 'guests_inp passive' : 'guests_inp active'}>
            <div className="box">
              <img onClick={() => setGuests(guests - 1)} className={guests == 1 ? 'none' : "change_num"} src="minus.png" alt="" />
            </div>
            <p className='num'>{guests}</p>
            <div className="box">
              <img onClick={() => setGuests(guests + 1)} className={guests == 10 ? 'none' : "change_num"} src="plus.png" alt="" />
            </div>
          </div>
          {guests == 10 && <p style={{ color: '#F90000' }}>Это максимум</p>}
        </div>
        <div className="input_box">
          <p>Место трапизы?</p>
          <div className="chose_place">
            <figure>
              <div id='1' className={place == 'Снаружи' ? 'outside active' : 'outside'} onClick={() => clickPlaceOutside()}></div>
              <figcaption>Снаружи</figcaption>
            </figure>
            <figure>
              <div id='2' className={place == 'Внутри' ? 'inside active' : 'inside'} onClick={() => clickPlaceInside()}></div>
              <figcaption>Внутри</figcaption>
            </figure>
          </div>
        </div>
        <button disabled={!guests || !place || !selectedDateTime} className='big_btn' onClick={subForm}>Далее</button>
      </div>
    </div>
  )
}
