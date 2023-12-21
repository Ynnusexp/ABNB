
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import {useNavigate } from 'react-router-dom';
import download from '../../img/pineapp.png';
import { NavLink } from 'react-router-dom';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  let sessionLinks;
  sessionLinks = (
    <>
        <ProfileButton user={sessionUser} />
    </>
  );

  return (

    <div className='nav-header'>
      <div className="nav-container">
      <img className='logo-img' src={download} onClick={() => {
        navigate("/")
      }} />
        </div>
        <>
        <NavLink to="/" className='logo-title' > GOO LAGOON </NavLink>
        </>
      <div>
      {isLoaded && sessionLinks}

      </div>

    </div>
  )
}

export default Navigation;
