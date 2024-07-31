import React, { useState, useEffect } from 'react';
import './LogInForm.scss';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/userSlice';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Loading from '../Loading/Loading';

export default function LogInForm() {

    //hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //user
    const auth = getAuth();
    const [os, setOs] = useState('');
    const provider = new GoogleAuthProvider();
    //inputs
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    //complete
    const [complete, setComplete] = useState(false);
    //errors
    const [err, setErr] = useState(false);

    useEffect(() => {
        const detectOS = () => {
            const osName = window.navigator.platform;
            if (osName.substring(0, 3) === 'Mac') {
                setOs(true);
            }
        };

        detectOS();
    }, []);

    function logInWithGoogle() {
        
        signInWithPopup(auth, provider)
            .then((user) => {
                console.log(user);
                navigate('/')
            }).catch((error) => {
                console.log(error);
            });
    }

    function loginUser(event) {
        event.preventDefault();
        setComplete(true);
        signInWithEmailAndPassword(auth, email, pass)
            .then(({ user }) => {
                console.log(user);
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }))
                navigate('/')
                setComplete(false);
            }).catch((error) => {
                console.log(error);
                setErr(true);
                setComplete(false);
            })
    }

    if (complete) {
        return <Loading />
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
                    <div className="row">
                        {err && <p className='errConfPass'>Неверный логин или пароль</p>}
                        {err && <Link to='/reset-password' className='errConfPass'>Забыли пароль?</Link>}
                    </div>
                </div>
                <button className='big_btn'>
                    Войти
                </button>
            </form>
            <div className="to_another_pages">
                {/* {os && <button className='flex_btn big_btn' onClick={() => alert("В разработке")}>
                    <img className='img-in-button' src="AppleLogo.png" alt="" />
                    <p>Continue with Apple</p>
                </button>}
                {!os && <button className='flex_btn big_btn' onClick={logInWithGoogle}>
                    <img className='img-in-button' src="google.png" alt="" />
                    <p>Continue with Google</p>
                </button>} */}
                <button className='flex_btn big_btn' onClick={logInWithGoogle}>
                    <img className='img-in-button' src="google.png" alt="" />
                    <p>Continue with Google</p>
                </button>
                <Link className='flex_btn big_btn under_big_btn' to='/sign-up'>
                    <h3 className='green'>Dont have an account?</h3>
                    <h3>Sign up</h3>
                </Link>
            </div>
        </div>
    )
}
