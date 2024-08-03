import './Reservation.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Loading from '../../Components/Loading/Loading';

export default function Reservation() {

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/onboarding')
        setUser(false)
        return
      }
    })
  }, [])

  return (
    <div className="container_reservation">
      <Link className='big_btn' to={'/profile'}>Profile</Link>
    </div>
  )
}
