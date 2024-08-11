import React, { useState } from 'react'
import './Payment.scss'
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import TopPanel from './../../Components/TopPanel/TopPanel';
import Loading from '../../Components/Loading/Loading';
import { ref, set } from "firebase/database";
import { db } from '../../main';

export default function Payment() {
  const auth = getAuth()
  const navigate = useNavigate()

  const [cardNumber, setCardNumber] = useState('');
  const [ssvCode, setSsvCode] = useState('');
  const [name, setName] = useState('');
  const [remPass, setRemPass] = useState(false);
  const [loading, setLoading] = useState(false)

  const [addData, setAddData] = useState(true)

  const arrKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  function handleKeyDownCard(event) {
    if (event.key == 'Backspace') {
      if (cardNumber[cardNumber.length - 2] == ' ') {
        setCardNumber(cardNumber.slice(0, -2))
        return
      }
      setCardNumber(cardNumber.slice(0, -1))
      return
    } else if (cardNumber.length == 19 || !arrKeys.includes(event.key)) {
      return
    } else if (cardNumber.replaceAll(" ", '').length % 4 == 0 && cardNumber.length !== 0) {
      setCardNumber(cardNumber + ' ' + event.key)
      return
    }
    setCardNumber(cardNumber + event.key)
  };

  function handleKeyDownCode(event) {
    if (event.key == 'Backspace') {
      setSsvCode(ssvCode.slice(0, -1))
      return
    } else if (ssvCode.length == 3 || !arrKeys.includes(event.key)) {
      return
    }
    setSsvCode(ssvCode + event.key)
  };

  function subForm() {
    if (remPass) {
      setLoading(true)
      set(ref(db, 'users/passwords/' + auth.currentUser.uid), {
        ssv: ssvCode,
        card: cardNumber,
        name: name,
      })
        .then(() => {
          setOnProcess(false)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
        });
    }
    setAddData(false)
  }

  function pay() {
    navigate('/')
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className='container'>
      <TopPanel link='/sub-reserv' />
      {addData && <div className="form_payment">
        <input onKeyDown={handleKeyDownCard} onChange={handleKeyDownCard} value={cardNumber} type="text" id='card' placeholder='Card number' />
        <div className="row">
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" id='name' autoComplete='off' placeholder='Name' />
          <input onKeyDown={handleKeyDownCode} onChange={handleKeyDownCode} value={ssvCode} type="text" id='code' placeholder='CCV code' />
        </div>
        <hr />
        <div className="row">
          <div className={!remPass ? "clever-box grey" : "clever-box blue"} onClick={() => setRemPass(!remPass)}>
            <div className={!remPass ? "circle" : "circle end"}></div>
          </div>
          <p>save password</p>
        </div>
        <button onClick={subForm} disabled={cardNumber.length < 16 || ssvCode.length < 3 || !name} className="big_btn">Продолжить</button>
      </div>}
      {!addData && <div className="form_payment">
        <input type="text" value={50} readOnly />
        <button onClick={pay} className='big_btn'>Оплатить</button>
      </div>}
    </div>
  )
}