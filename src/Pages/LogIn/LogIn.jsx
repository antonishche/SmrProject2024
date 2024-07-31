import React from 'react'
import './LogIn.scss';
import TopPanel from '../../Components/TopPanel/TopPanel';
import LogInForm from '../../Components/LogInForm/LogInForm';

export default function LogIn() {
  
  return (
    <div className='container'>
      <TopPanel link={'/onboarding'}/>
      <LogInForm/>
    </div>
  )
}
