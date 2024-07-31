import React, { useState, useEffect } from 'react'
import { getAuth, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
// import { setUser } from '../../store/slices/userSlice';
import TopPanel from '../../Components/TopPanel/TopPanel';
import './Profile.scss'
import { async } from '@firebase/util';
import Loading from '../../Components/Loading/Loading';

export default function Profile() {

  const [image, setImage] = useState('profile.webp');
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(false)
  const arrow = "<";

  const [name, setName] = useState(false)
  const [newEmail, setNewEmail] = useState(false)
  const [number, setNumber] = useState(false)


  function handleChange(e) {
    console.log(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/onboarding')
        setUser(false)
        return
      }
      setUser({
        email: currentUser.email,
        name: currentUser.displayName,
        number: currentUser.phoneNumber
      })
    })
  }, [])

  if (!user) {
    return <Loading/>
  }

  function signOutUser(event) {
    event.preventDefault();
    signOut(auth).then(() => {
      console.log('by');
    }).catch((error) => {
      console.log(error);
    });
  }

  // function updateUserEmail(user, newEmail) {
  //   updateProfile(user, newEmail).then(() => {
  //     console.log('Email updated successfully');
  //   }).catch((error) => {
  //     console.error('Error updating email:', error);
  //   });
  // }

  return (
    <div className="container_profile">
      <div className="logo_name_box">
            <Link className='go_back' to={'/'}><p className='arr_transform'>{arrow}</p></Link>
            <img className='profile_image' src={image} />
            <h1 className='del_img' onClick={()=>setImage('profile.webp')}>+</h1>
        </div>
      <div className='form_signup_and_login'>
        <form action="" onSubmit={() => console.log('hi')} className='inputs_signup_and_login'>
          <input className='image_input' type="file" onChange={handleChange}></input>
          <input type="text" onChange={(e)=>{setName(e.target.value)}} placeholder="Имя" defaultValue={user.name} required></input>
          <input type="email" onChange={(e)=>{setNewEmail(e.target.value)}} placeholder="Email" defaultValue={user.email} required></input>
          <input type="text" onChange={(e)=>{setNumber(e.target.value)}} placeholder="Телефон" defaultValue={user.number}></input>
          <button className='big_btn' type="submit">Сохранить изменения</button>
          <button className='log_out' onClick={signOutUser}>Выйти</button>
        </form>
      </div>
    </div>
  )
}
