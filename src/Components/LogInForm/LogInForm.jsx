import React, { useState } from 'react';
import './LogInForm.scss';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/userSlice';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LogInForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = getAuth();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [err, setErr] = useState(false);

    function loginUser(event) {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, pass)
            .then(({user}) => {
                console.log(user);
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }))
                navigate('/')
            }).catch((e) => {
                console.log(e);
                setErr(true);
            })
    }

    return (
        <div className='form_signup_and_login'>
            <form onSubmit={loginUser} className='inputs_signup_and_login' action="">
                <input
                    type="email"
                    value={email}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete='off'
                    required
                />
                <div className="err_box">
                    <input
                        type="password"
                        placeholder='Пароль'
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        autoComplete='off'
                        required
                    />
                    {err && <Link to='/resetpassword' className='errConfPass'>Забыли пароль?</Link>}
                </div>
                <button className='big_btn'>
                    Войти
                </button>
            </form>
            <div className="to_another_pages">
                <button className='apple_reg big_btn'>
                    <img src="AppleLogo.png" alt="" />
                    <p>Continue with Apple</p>
                </button>
                <Link className='apple_reg big_btn under_big_btn' to='/signup'>
                    <h3 className='green'>Dont have an account?</h3>
                    <h3>Sign up</h3>
                </Link>
            </div>
        </div>
    )
}
