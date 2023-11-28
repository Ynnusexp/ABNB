
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { Link, useNavigate } from 'react-router-dom';
import download from '../../img/download.png';

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
      <img className='logo-img' src={download} onClick={() => {
        navigate("/")
      }} />
      <ul className='list-wrapper'>
        <Link to="/spots/create" style={{marginRight: '10px'}}>
          Create a New Spot
        </Link>
        {isLoaded && sessionLinks}
      </ul>
    </div>
  )
}

export default Navigation;
