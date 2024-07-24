import './Reservation.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

import Loading from '../../Components/Loading/Loading';

export default function Reservation() {

  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/onboarding')
        setUser({
          email: null
        })
        return
      }
      setUser({
        email: currentUser.email,
      })
    })
  }, [])

  if (!user) {
    return <Loading/>
  }

  function signOutUser(event) {
    event.preventDefault();
    signOut(auth).then(() => {
      setUser(false)
      navigate('/onboarding')
      console.log('hi');
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="container_reservation">
      <div>Reservation</div>
      <button onClick={signOutUser}>LogOut</button>
      <p>{user.email}</p>
    </div> 
  )
}
