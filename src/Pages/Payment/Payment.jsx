import React, { useState, useEffect } from 'react'
import './Payment.scss'
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import TopPanel from './../../Components/TopPanel/TopPanel';
import Loading from '../../Components/Loading/Loading';
import { ref, set, get } from "firebase/database";
import { db } from '../../main';

export default function Payment() {
  const auth = getAuth()
  const navigate = useNavigate()
  const arrow = "<";
  const basketFood = JSON.parse(localStorage.getItem('basketFood'))
  const [cardNumber, setCardNumber] = useState('');
  const [ssvCode, setSsvCode] = useState('');
  const [name, setName] = useState('');
  const [remPass, setRemPass] = useState(false);
  const [loading, setLoading] = useState(false)
  const [totalCost, setTotalCost] = useState(50)
  const [addData, setAddData] = useState(true)
  const [modal, setModal] = useState(false)

  const arrKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 0, 1, 2, 3, 4, 5, 6, 7, 8,9]

  useEffect(() => {
    setLoading(true)
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/onboarding')
        return
      } else {
        if (basketFood.length) {
          setModal(!modal)
        }
        get(ref(db, 'users/passwords/' + auth.currentUser.uid)).then((snapshot) => {
          if (snapshot.exists() && snapshot.child !== null) {
            setCardNumber(snapshot.val().card)
            setName(snapshot.val().name)
            setSsvCode(snapshot.val().ssv+'')
          }
        }).catch((error) => {
          console.error(error);
        });
      }
    })
    setLoading(false)
  }, [auth.currentUser])

  function handleKeyDownCode(e) {
    if (e.key == 'Backspace') {
      setSsvCode('')
      return
    } else if (ssvCode.length == 3) {
      return
    }else if (ssvCode.length > 3) {
      ssvCode.slice(0,2)
      return
    }
    setSsvCode(e.target.value)
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

  function countTotal() {
    const total = basketFood.reduce((acc, el) => {
      if (el.size === 'small') {
        return acc + el.souce.cost * el.count
      } else if (el.size === 'medium') {
        return acc + Math.trunc(el.souce.cost * el.souce.multiplier * el.count)
      } else if (el.size === 'big') {
        return acc + Math.trunc(el.souce.cost * el.souce.multiplier * el.souce.multiplier * el.count)
      }
    }, 0)
    setTotalCost(totalCost + total)
  }

  function pay() {
    setLoading(true)
    const newArr = basketFood.map((el) => {
      return ({
        type: el.souce.type,
        name: el.souce.name,
        size: el.size,
        count: el.count
      })
    })
    console.table(newArr);
    if (newArr.length) {
      set(ref(db, 'users/food/' + auth.currentUser.uid), {
        basketFood,
      })
        .then(() => {
          
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
        });
    }
    navigate('/')
    setLoading(false)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className='container'>
      {modal && <div className="modal-home">
        <div className="mini_cont">
          <div className="logo_name_box">
          <div className='go_back' onClick={()=>setModal(!modal)}><p className='arr_transform'>{'<'}</p></div>
          </div>
          <p>Желаете оплатить блюда сейчас?</p>
          <div className="row">
            <button className="btn1" onClick={()=>setModal(!modal)}>На месте</button>
            <button className="btn2" onClick={()=>{setModal(!modal);countTotal()}}>Сейчас</button>
          </div>
        </div>
      </div>}
      {addData && <TopPanel />}
      {addData && <div className="form_payment">
        <input onChange={(e)=>{if (cardNumber.length !== 16) {
          setCardNumber(e.target.value)
        }}} value={cardNumber} type="number" id='card' placeholder='Card number' />
        <div className="row">
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" id='name' autoComplete='off' placeholder='Name' />
          <input onChange={(e)=>{if (ssvCode.length !== 3) {
          setSsvCode(e.target.value)
        }}} value={ssvCode} type="number" id='code' placeholder='CCV code' />
        </div>
        <hr />
        <div className="row">
          <div className={!remPass ? "clever-box grey" : "clever-box blue"} onClick={() => setRemPass(!remPass)}>
            <div className={!remPass ? "circle" : "circle end"}></div>
          </div>
          <p>save card details</p>
        </div>
        <button onClick={subForm} disabled={cardNumber.length !== 16 || ssvCode.length !== 3 || !name} className="big_btn">Продолжить</button>
      </div>}
      {!addData && <div className="logo_name_box">
        <div onClick={() => setAddData(!addData)} className='go_back'><p className='arr_transform'>{arrow}</p></div>
      </div>}
      {!addData && <div className="form_payment">
        <input type="text" value={totalCost + ' р'} readOnly />
        <button onClick={pay} className='big_btn'>Оплатить</button>
      </div>}
    </div>
  )
}