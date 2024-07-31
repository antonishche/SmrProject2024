import React, { useState } from 'react';
import './PassReset.scss';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Loading from '../../Components/Loading/Loading';
import { Link } from 'react-router-dom';

export default function PassReset() {

    const auth = getAuth();
    const [email, setEmail] = useState('');
    const arrow = "<";
    const [done, setDone] = useState(false);
    const [hideButton, setHideButton] = useState(true);
    const [wrongEmail, setWrongEmail] = useState(false);
    const [complete, setComplete] = useState(false);

    function passwordReset(event) {
        event.preventDefault();
        setComplete(true);
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setHideButton(false);
                setDone(true);
                setComplete(false);
            })
            .catch((error) => {
                console.log(error);
                setWrongEmail(true);
                setComplete(false);
            });
    }

    if (complete) {
        return <Loading/>
    }

    return (
        <div className='container'>
            <div className="logo_name_box">
                <Link className='go_back' to='/log-in'><p className='arr_transform'>{arrow}</p></Link>
                <h1 className='logo_name'>Chefis</h1>
            </div>
            <div className="form_signup_and_login">
                <form onSubmit={passwordReset} className='inputs_signup_and_login' action="">
                    {hideButton && <h3 className='tell_the_deal'>Письмо для сброса пароля на адрес:</h3>}
                    {hideButton && <div className="err_box">
                        <input
                            type="email"
                            value={email}
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete='off'
                            required
                        />
                        {wrongEmail && <h3 className='errConfPass'>Неверный email</h3>}
                    </div>}
                    {hideButton && <button className='big_btn' type='submit'>Отправить</button>}
                    {done && <h2>Письмо отправлено</h2>}
                    {done && <Link to='/log-in' className='big_btn'>Назад</Link>}
                </form>
            </div>
        </div>
    )
}
