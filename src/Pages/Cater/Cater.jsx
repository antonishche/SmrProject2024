import React, {useState, useEffect} from 'react'
import './Cater.scss'
import { useNavigate } from 'react-router-dom'
import TopPanel from '../../Components/TopPanel/TopPanel'

export default function Cater() {
    const [guests, setGuests] = useState('')
    const [selectedDateTime, setSelectedDateTime] = useState('');
  
    const navigate = useNavigate();

    const arrKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    useEffect(()=>{
        const cater = JSON.parse(sessionStorage.getItem('cater'))
        if (cater.length) {
            setSelectedDateTime(cater.date)
            setGuests(cater.guests)
        }
    },[])

    function handleKeyDownGuests(event) {
        if (event.key === 'Backspace') {
          setGuests(guests.slice(0, -1))
          return
        } else if (guests.length == 2 || !arrKeys.includes(event.key)) {
          return
        }
        setGuests(guests + event.key)
      };
  
    function subForm(e) {
      e.preventDefault()
      const cater = {
        date: selectedDateTime,
        guests: guests,
      }
      sessionStorage.setItem('cater', JSON.stringify(cater))
      navigate('/sub-cater')
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
              {/* <div className="box">
                <img onClick={() => {
                    setGuests(+guests - 1)
                }} className={!guests ? 'none' : "change_num"} src="minus.png" alt="" />
              </div> */}
              <input className='clever_guests' onKeyDown={handleKeyDownGuests} onChange={handleKeyDownGuests} value={guests} type="text" id='code' placeholder='гости' />
            </div>
            {guests == 10 && <p style={{ color: '#F90000' }}>Это максимум</p>}
          </div>
          <button disabled={!guests || !selectedDateTime} className='big_btn' onClick={subForm}>Далее</button>
        </div>
      </div>
    )
}
