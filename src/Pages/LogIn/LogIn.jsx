import './LogIn.scss';
import { Link } from 'react-router-dom';
import LogInForm from '../../Components/LogInForm/LogInForm';

export default function LogIn() {

  const arrow = "<";

  return (
    <div className='container_login'>
      <div className="logo_name_box">
        <Link className='go_back' to='/onboarding'><p className='arr_transform'>{arrow}</p></Link>
        <h1 className='logo_name'>Chefis</h1>
      </div>
      <LogInForm/>
    </div>
  )
}
