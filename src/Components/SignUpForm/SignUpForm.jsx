import React, { useState, useEffect } from 'react'
import './SignUpForm.scss'
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, linkWithCredential } from "firebase/auth";
import Loading from '../Loading/Loading';

export default function SignUpForm() {

  //hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //user
  const auth = getAuth();
  const [os, setOs] = useState('');
  const provider = new GoogleAuthProvider();
  //inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');
  //complete
  const [complete, setComplete] = useState(false);
  const [duringRegistr, setDuringRegistr] = useState(true);
  const [registrated, setRegistrated] = useState(false);
  //errors
  const [emailAlreadyInUse, setEmailAlreadyInUse] = useState(false);
  const [errConfPass, setErrConfPass] = useState(false);
  const [shortPass, setShortPass] = useState(false);

  useEffect(() => {
    const detectOS = () => {
      const osName = window.navigator.platform;
      console.log(osName);
      if (osName.substring(0, 3) === 'Mac') {
        setOs(true);
      }
    };

    detectOS();
  }, []);

  function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then(() => {
        navigate('/')
        console.log(auth.currentUser);
      }).catch((error) => {
        console.log(error);
      });
  }

  function creatUser(event) {
    event.preventDefault();
    setEmailAlreadyInUse(false);
    setErrConfPass(false);
    setShortPass(false);
    if (confPass !== password) {
      setErrConfPass(true);
      return;
    }else if (password.length < 6) {
      setShortPass(true);
      return;
    }
    setComplete(true);
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      console.log(user);
      dispatch(setUser({
        email: user.email,
        id: user.uid,
        token: user.accessToken,
      }))
      setDuringRegistr(false);
      setRegistrated(true);
      setEmailAlreadyInUse(false);
      setComplete(false);
    }).catch((error) => {
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        setEmailAlreadyInUse(true);
        setComplete(false);
        return;
      }
      setComplete(false);
    })
  };

  if (complete) {
    return <Loading />
  }

  return (
    <div className='form_signup_and_login'>
      {duringRegistr && <form onSubmit={creatUser} className='inputs_signup_and_login' action="">
        <div className="err_box">
          <input
            type="email"
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='off'
            required
          />
          {emailAlreadyInUse && <p className='errConfPass'>Email уже исползуется</p>}
        </div>
        <div className="err_box">
          <input
            type="password"
            placeholder='Пароль'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='off'
            required
          />
          {shortPass && <p className='errConfPass'>Пароль должен содержать не менее шести символов</p>}
        </div>
        <div className="err_box">
          <input
            type="password"
            placeholder='Подтвердить пароль'
            value={confPass}
            onChange={(e) => setConfPass(e.target.value)}
            autoComplete='off'
            required
          />
          {errConfPass && <p className='errConfPass'>Пароли не совпадают</p>}
        </div>
        <button type='submit' className='big_btn'>Создать аккаунт</button>
      </form>}
      {duringRegistr && <div className="to_another_pages">
        {/* {os && <button className='flex_btn big_btn' onClick={() => alert("В разработке")}>
          <img className='img-in-button' src="AppleLogo.png" alt="" />
          <p>Continue with Apple</p>
        </button>}
        {!os && <button className='flex_btn big_btn'  onClick={signInWithGoogle}>
          <img className='img-in-button' src="google.png" alt="" />
          <p>Continue with Google</p>
        </button>} */}
        <button className='flex_btn big_btn'  onClick={signInWithGoogle}>
          <img className='img-in-button' src="google.png" alt="" />
          <p>Continue with Google</p>
        </button>
        <Link className='flex_btn under_big_btn' to='/log-in'>
          <h3 className='green'>Already have an account?</h3>
          <h3>Sign in</h3>
        </Link>
      </div>}
      {registrated && <h2>Успешная регистрация</h2>}
      {registrated && <button onClick={() => navigate('/')} className='big_btn'>Продолжить</button>}
    </div>
  )
}
