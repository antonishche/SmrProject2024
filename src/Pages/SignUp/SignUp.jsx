import React from 'react'
import './SignUp.scss'
import { Link } from 'react-router-dom';
import SignUpForm from '../../Components/SignUpForm/SignUpForm' 

export default function SignUp() {
  const arrow = "<";

  return (
    <div className='container_signup'>
      <div className="logo_name_box">
        <Link className='go_back' to='/onboarding'><p className='arr_transform'>{arrow}</p></Link>
        <h1 className='logo_name'>Chefis</h1>
      </div>
      <SignUpForm/>
    </div>
  )
}
