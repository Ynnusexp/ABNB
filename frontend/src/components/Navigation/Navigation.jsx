
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import './Navigation.css';
import { useNavigate } from 'react-router-dom';
import download from '../../img/download.png';
import { loginDemo } from '../../store/session';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <>
        <li>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
        </li>
        <li>
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </li>
        <li>
          {/* create button for demo user login button. onClick should ping backend login route with demo user's credentials */}
          <button
          onClick={()=> {
              dispatch(loginDemo())
          }}
          >
          Log in as Demo User
          </button>
        </li>
      </>
    );
  }

  return (

    <div className='nav-header'>
      <img className='logo-img' src={download} onClick={() => {
        navigate("/")
      }} />
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    </div>
  )
}

export default Navigation;
