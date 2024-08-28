import React , { useEffect, useState } from 'react'
import './Onboarding.scss'
import { Link } from 'react-router-dom'
import Loading from '../../Components/Loading/Loading';

export default function Onboarding() {

  const [ready, setReady] = useState(false);
  const arrBasketFood = [];
  sessionStorage.setItem('cater', JSON.stringify({}))
  localStorage.setItem('basketFood', JSON.stringify(arrBasketFood));

  useEffect(() => { 
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    setReady(true);
    return () => document.body.style.overflow = 'visible';
  }, []);
  
  if (!ready) {
    return <Loading/>
  }

  return (
    <div className='container_onboarding'>
      <h1 className='big_logo_name'>Chefis</h1>
      <div className="registr_btns">
        <Link className='to_login big_btn' to='/log-in'>Войти</Link>
        <Link className='to_signup under_big_btn' to='/sign-up'>Создать аккаунт</Link>
      </div>
    </div>
  )
}
