import React, { useState } from 'react';
import './PassReset.scss';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from 'react-router-dom';

export default function PassReset() {

    const auth = getAuth();
    const [email, setEmail] = useState('');
    const arrow = "<";
    const [done, setDone] = useState(false);
    const [hideButton, setHideButton] = useState(true);
    const [wrongEmail, setWrongEmail] = useState(false);

    function passwordReset(event) {
        event.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setHideButton(false);
                setWrongEmail(false);
                setDone(true);
            })
            .catch((error) => {
                console.log(error);
                setWrongEmail(true);
            });
    }

    return (
        <div className='container_resetpass'>
            <div className="logo_name_box">
                <Link className='go_back' to='/login'><p className='arr_transform'>{arrow}</p></Link>
                <h1 className='logo_name'>Chefis</h1>
            </div>
            <div className="form_signup_and_login">
                <form onSubmit={passwordReset} className='inputs_signup_and_login' action="">
                    <h3 className='tell_the_deal'>Письмо для сброса пароля на адрес:</h3>
                    <div className="err_box">
                        <input
                            type="email"
                            value={email}
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete='off'
                            required
                        />
                        {wrongEmail && <h3 className='wrong_email_to_reset_pass'>Неверный email</h3>}
                    </div>
                    {hideButton && <button className='big_btn' type='submit'>Отправить</button>}
                    {done && <h2>Письмо отправлено</h2>}
                </form>
            </div>
        </div>
    )
}
