
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
      <div>
      <img className='logo-img' src={download} onClick={() => {
        navigate("/")
      }} />
        </div>
      <div>
      <ul className= "list-wrapper">
        {sessionUser && (<Link className="create-a-spot-btn" to="/spots/create" style={{marginRight: '140px'}}>
          Create a New Spot
        </Link>)
        }
        {isLoaded && sessionLinks}
      </ul>
      </div>

    </div>
  )
}

export default Navigation;
