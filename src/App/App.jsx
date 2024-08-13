import { Routes, Route } from 'react-router-dom'
import './App.scss'
import '../style/_template.scss'
import HomePage from '../Pages/HomePage/HomePage';
import LogIn from './../Pages/LogIn/LogIn';
import SignUp from './../Pages/SignUp/SignUp';
import Onboarding from './../Pages/Onboarding/Onboarding';
import Error from './../Pages/Error/Error';
import PassReset from './../Pages/PassReset/PassReset';
import Profile from './../Pages/Profile/Profile';
import Reserv from './../Pages/Reserv/Reserv';
import Tables from '../Pages/Tables/Tables';
import SubReserv from '../Pages/SubReserv/SubReserv';
import Payment from '../Pages/Payment/Payment';
import Menu from '../Pages/Menu/Menu';
import Contacts from '../Pages/Contacts/Contacts';

function App() {

  return (
    <Routes>
      <Route path='/' Component={HomePage} />
      <Route path='/profile' Component={Profile} />
      <Route path='/log-in' Component={LogIn} />
      <Route path='/sign-up' Component={SignUp} />
      <Route path='/onboarding' Component={Onboarding} />
      <Route path='/reset-password' Component={PassReset} />
      <Route path='/tables' Component={Tables} />
      <Route path='/reserv' Component={Reserv} />
      <Route path='/sub-reserv' Component={SubReserv} />
      <Route path='/payment' Component={Payment} />
      <Route path='/menu' Component={Menu} />
      <Route path='/contacts' Component={Contacts} />
      <Route path='*' Component={Error} />
    </Routes>
  )
}

export default App
