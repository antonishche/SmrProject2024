import React, { useState, useEffect, useRef, useCallback } from 'react'
import { getAuth, signOut, onAuthStateChanged, updateProfile, updateEmail } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useNavigate, Link } from 'react-router-dom';
import TopPanel from '../../Components/TopPanel/TopPanel';
import './Profile.scss'
import { async } from '@firebase/util';
import Loading from '../../Components/Loading/Loading';

import { useAuth } from '../../hooks/use-auth';

export default function Profile() {

  const auth = getAuth();
  const storage = getStorage();
  const navigate = useNavigate();
  const arrow = "<";

  const refImg = useRef(null)
  const handleClick = useCallback(() => refImg.current?.click(), []);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [image, setImage] = useState('');
  const [file, setFile] = useState('');
  const [user, setUser] = useState('');


  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    if (e.target.files[0]) {
      console.log(e.target.files);
      setImage(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0])
    }
  }

  async function upload(e) {
    e.preventDefault()
    const fileRef = ref(storage, auth.currentUser.uid + '.png');
    setLoading(true)
    if (image === '') {
      delImage()
    }
    const snapshoot = await uploadBytes(fileRef, file)
    const photoURL = await getDownloadURL(fileRef)
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL,
    }).then(() => {
      console.log(auth.currentUser);
    }).catch((error) => {
      console.log(error);
    });
    setLoading(false)
    setUser({
      name: auth.currentUser.displayName,
      image: auth.currentUser.photoURL,
    })
  }

  async function delImage() {
    const desertRef = storage.child;
    await desertRef.delete(auth.currentUser.uid + '.png').then(()=>{
      console.log(auth.currentUser);
      setLoading(false)
    }).catch((error)=>{
      console.log(error);
      setLoading(false)
    });
  }

  useEffect(() => {
    setLoading(true)
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/onboarding')
        setLoading(false)
        return
      }
      setUser({
        name: currentUser.displayName,
        image: currentUser.photoURL,
      })
      setEmail(currentUser.email)
      if (auth.currentUser.phoneNumber) {
        setNumber(currentUser.phoneNumber)
      }
      if (auth.currentUser?.photoURL) {
        setImage(currentUser.photoURL)
      }
      if (auth.currentUser.displayName) {
        setName(currentUser.displayName)
      }
      setLoading(false)
    })
  }, [auth.currentUser])

  if (loading) {
    return <Loading />
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
        <Link className='go_back' to={'/menu'}><p className='arr_transform'>{arrow}</p></Link>
        <img className='profile_image' onClick={handleClick} src={image} />
        <h1 className='del_img' onClick={() => setImage('')}>+</h1>
      </div>
      <div className='form_signup_and_login'>
        <form action="" onSubmit={upload} className='inputs_signup_and_login'>
          <input
            className='image_input'
            type="file"
            ref={refImg}
            style={{ display: 'none' }}
            onChange={handleChange} />
          <input type="text" onChange={(e) => { setName(e.target.value) }} placeholder="Имя" defaultValue={name} required />
          <input type="email" style={{outline: 'none'}} readOnly value={email} />
          {/* <input type="text" onChange={(e) => { setNumber(e.target.value) }} placeholder="Телефон" defaultValue={number} /> */}
          <button disabled={name == user.name && image == user.image} className='big_btn' type="submit">Сохранить изменения</button>
          <button className='log_out' onClick={signOutUser}>Выйти</button>
        </form>
      </div>
    </div>
  )
}
