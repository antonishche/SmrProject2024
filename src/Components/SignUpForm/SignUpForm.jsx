import React, { useState, useEffect } from 'react'
import './SignUpForm.scss'
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpForm() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');

  const [duringRegistr, setDuringRegistr] = useState(true);
  const [registrated, setRegistrated] = useState(false);

  const [emailAlreadyInUse, setEmailAlreadyInUse] = useState(false);
  const [errConfPass, setErrConfPass] = useState(false);
  const [shortPass, setShortPass] = useState(false);

  function creatUser(event) {
    event.preventDefault();

    if(confPass !== password){
      setErrConfPass(true);
      setShortPass(false);
      setEmailAlreadyInUse(false);
      return;
    }else if (password.length < 6) {
      setErrConfPass(false);
      setEmailAlreadyInUse(false);
      setShortPass(true);
      return;
    }
    const auth = getAuth();
    setErrConfPass(false);
    setShortPass(false);
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
    }).catch((e) => {
      console.log(e);
      setEmailAlreadyInUse(true);
    })
  };

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
        <button className='apple_reg big_btn'>
          <img src="AppleLogo.png" alt="" />
          <p>Continue with Apple</p>
        </button>
        <Link className='apple_reg under_big_btn' to='/login'>
          <h3 className='green'>Already have an account?</h3>
          <h3>Sign in</h3>
        </Link>
      </div>}
      {registrated && <h2>Успешная регистрация</h2>}
      {registrated && <button onClick={() => navigate('/')} className='big_btn'>Продолжить</button>}
    </div>
  )
}
