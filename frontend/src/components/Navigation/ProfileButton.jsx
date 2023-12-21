// frontend/src/components/Navigation/ProfileButton.jsx

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { Link, useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();
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

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    toggleMenu();
    dispatch(sessionActions.logout());
    navigate("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  console.log(user, "user");
  const dropDownContentClassName = "dropdown-content" + (showMenu ? "" : " hidden");
  return (
    <div className="profile-container">
       {sessionUser && (<Link className="create-a-spot-btn" to="/spots/create">
          Create a New Spot
        </Link>)
        }
      <button className="drop-btn" onClick={toggleMenu}>
        <i className="fas fa-bars" style={{ marginRight: "5px" }} />
        <i className="fas fa-user-circle" />
      </button>

      <div className= {dropDownContentClassName}>
        {sessionUser ? (
          <ul className={ulClassName} ref={ulRef}>
            {/* <li>{user.username}</li> */}
            <li> Hello, {user.firstName}!</li>
            <li> email: {user.email}</li>
            <li>
              <Link className="managespots-btn" to="/managespots">Manage Spots</Link>{" "}
            </li>
            <li>
              <button className="logout-btn"
                // onClick={(e) => {e.preventDefault(); logout(); toggleMenu();}}
                onClick={logout}
              >
                Log Out
              </button>
            </li>
          </ul>
        ) : (
          <ul className={ulClassName} ref={ulRef}>
            <div className="mt-10">
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
            </div>
          </ul>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
