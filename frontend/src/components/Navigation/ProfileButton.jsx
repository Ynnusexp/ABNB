// frontend/src/components/Navigation/ProfileButton.jsx

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Link, useNavigate } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate()
  const sessionUser = useSelector((state) => state.session.user);

  const toggleMenu = (e) => {
    if (e) {
      e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    }
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    toggleMenu();
    dispatch(sessionActions.logout());
    navigate("/")
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  console.log(user, "user")

  return (
    <>
      <button onClick={toggleMenu}>
        <i className="fas fa-bars" style={{ marginRight: '5px'}}/>
        <i className="fas fa-user-circle" />
      </button>
      {sessionUser ? <ul className={ulClassName} ref={ulRef}>
        <li>{user.username}</li>
        <li> Hello, {user.firstName}</li>
        <li> email: {user.email}</li>
        <li><Link to="/managespots">Manage Spots</Link> </li>
        <li>
          <button
          // onClick={(e) => {e.preventDefault(); logout(); toggleMenu();}}
          onClick={logout}
          >Log Out
          </button>
        </li>
      </ul>:
      <ul className={ulClassName} ref={ulRef}>
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
      </ul>
    }
    </>
  );
}

export default ProfileButton;
