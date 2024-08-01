import React, { useState, useEffect, useRef, useCallback } from 'react'
import { getAuth, signOut, onAuthStateChanged, updateProfile, updateEmail } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
// import { setUser } from '../../store/slices/userSlice';
import TopPanel from '../../Components/TopPanel/TopPanel';
import './Profile.scss'
import { async } from '@firebase/util';
import Loading from '../../Components/Loading/Loading';

export default function Profile() {

  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(false)
  const arrow = "<";

  const ref = useRef(null)
  const handleClick = useCallback(() => ref.current?.click(), []);

  const [name, setName] = useState(false)
  const [email, setEmail] = useState(false)
  const [number, setNumber] = useState(false)
  const [image, setImage] = useState('');

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
      setEmail(currentUser.email)
      setName(currentUser.displayName)
      setNumber(currentUser.phoneNumber)
      setImage(currentUser.photoURL)
      setUser({
        email: email,
        displayName: name,
        phoneNumber: number,
        photoURL: image
      })
      if (image == undefined) {
        setImage('profile.webp')
      }
    })
  }, [])

  if (!user) {
    return <Loading />
  }

  // function changeEmail(event) {
  //   event.preventDefault()
  //   updateEmail(auth.currentUser, email).then(({user}) => {
  //     // Email updated!
  //     console.log(user);
  //     // ...
  //   }).catch((error) => {
  //     console.log(error);
  //     // An error occurred
  //     // ...
  //   });

  // }

  function addProfileDetails(event) {
    event.preventDefault()
    updateProfile(auth.currentUser, {
      displayName: name, photoURL: image,
    }).then(() => {
      console.log(auth.currentUser);
    }).catch((error) => {
      console.log(error);
    });
  }

  function signOutUser(event) {
    event.preventDefault();
    signOut(auth).then(() => {
      console.log('by');
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="container_profile">
      <div className="logo_name_box">
        <Link className='go_back' to={'/'}><p className='arr_transform'>{arrow}</p></Link>
        <img className='profile_image' onClick={handleClick} src={image} />
        <h1 className='del_img' onClick={() => setImage('profile.webp')}>+</h1>
      </div>
      <div className='form_signup_and_login'>
        <form action="" onSubmit={() => console.log('hi')} className='inputs_signup_and_login'>
          <input
            className='image_input'
            type="file"
            ref={ref}
            style={{ display: 'none' }}
            onChange={handleChange} />
          <input type="text" onChange={(e) => { setName(e.target.value) }} placeholder="Имя" defaultValue={name} required />
          <input type="email" readOnly value={email} />
          {/* <input type="text" onChange={(e) => { setNumber(e.target.value) }} placeholder="Телефон" defaultValue={number} /> */}
          <button className='big_btn' type="submit" onClick={addProfileDetails}>Сохранить изменения</button>
          <button className='log_out' onClick={signOutUser}>Выйти</button>
        </form>
      </div>
    </div>
  )
}
