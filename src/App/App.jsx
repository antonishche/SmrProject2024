import { React, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.scss'
import '../style/_template.scss'
import HomePage from '../Pages/HomePage/HomePage';
import LogIn from './../Pages/LogIn/LogIn';
import SignUp from './../Pages/SignUp/SignUp';
import Onboarding from './../Pages/Onboarding/Onboarding';
import PassReset from './../Pages/PassReset/PassReset';
import Profile from './../Pages/Profile/Profile';
import Reserv from './../Pages/Reserv/Reserv';
import Tables from '../Pages/Tables/Tables';
import SubReserv from '../Pages/SubReserv/SubReserv';
import Payment from '../Pages/Payment/Payment';
import Menu from '../Pages/Menu/Menu';
import Contacts from '../Pages/Contacts/Contacts';
import Description from '../Pages/Description/Description';
import Basket from '../Components/Basket/Basket';
import Loading from '../Components/Loading/Loading';
import Catering from '../Pages/Catering/Catering';
import Cater from '../Pages/Cater/Cater'
import SubCater from '../Pages/SubCater/SubCater';

const Error = lazy(() => import('./../Pages/Error/Error'));

const SuspenseError = () => (
  <Suspense fallback={<Loading/>}>
    <Error />
  </Suspense>
);

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
      <Route path='/description' Component={Description} />
      <Route path='/basket' Component={Basket} />
      <Route path='/catering' Component={Catering} />
      <Route path='/cater' Component={Cater} />
      <Route path='sub-cater' Component={SubCater} />
      <Route path='*' Component={SuspenseError} />
    </Routes>
  )
}

export default App
