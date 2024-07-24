import { Routes, Route } from 'react-router-dom'
import './App.scss'
import '../style/_template.scss'
import Reservation from './../Pages/Reservation/Reservation';
import LogIn from './../Pages/LogIn/LogIn';
import SignUp from './../Pages/SignUp/SignUp';
import Onboarding from './../Pages/Onboarding/Onboarding';
import Error from './../Pages/Error/Error';
import PassReset from './../Pages/PassReset/PassReset';

function App() {

  return (
    <Routes>
      <Route path='/' Component={Reservation} />
      <Route path='/login' Component={LogIn} />
      <Route path='/signup' Component={SignUp} />
      <Route path='/onboarding' Component={Onboarding} />
      <Route path='/resetpassword' Component={PassReset} />
      <Route path='*' Component={Error} />
    </Routes>
  )
}

export default App
