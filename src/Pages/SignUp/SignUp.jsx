import React from 'react'
import './SignUp.scss'
import SignUpForm from '../../Components/SignUpForm/SignUpForm'
import TopPanel from '../../Components/TopPanel/TopPanel';

export default function SignUp() {
  
  return (
    <div className='container'>
      <TopPanel link='/onboarding' name='Chefis' />
      <SignUpForm />
    </div>
  )
}
