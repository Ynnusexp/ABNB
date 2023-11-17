
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

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
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;


// // frontend/src/components/Navigation/Navigation.jsx

// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import OpenModalButton from '../OpenModalButton//OpenModalButton';
// import LoginFormModal from '../LoginFormModal/LoginFormModal';
// import './Navigation.css';

// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector((state) => state.session.user);

//   const sessionLinks = sessionUser ? (
//     <li>
//       <ProfileButton user={sessionUser} />
//     </li>
//   ) : (
//     <>
//       <li>
//         <OpenModalButton
//           buttonText="Log In"
//           modalComponent={<LoginFormModal />}
//         />
//       </li>
//       <li>
//         <NavLink to="/signup">Sign Up</NavLink>
//       </li>
//     </>
//   );

//   return (
//     <ul>
//       <li>
//         <NavLink to="/">Home</NavLink>
//       </li>
//       {isLoaded && sessionLinks}
//     </ul>
//   );
// }

// export default Navigation;

// // import { NavLink } from 'react-router-dom';
// // import { useSelector } from 'react-redux';
// // import ProfileButton from './ProfileButton';
// // import './Navigation.css';

// // function Navigation({ isLoaded }){
// //   const sessionUser = useSelector(state => state.session.user);

// //   const sessionLinks = sessionUser ? (
// //     <li>
// //       <ProfileButton user={sessionUser} />
// //     </li>
// //   ) : (
// //     <>
// //       <li>
// //         <NavLink to="/login">Log In</NavLink>
// //       </li>
// //       <li>
// //         <NavLink to="/signup">Sign Up</NavLink>
// //       </li>
// //     </>
// //   );

// //   return (
// //     <ul>
// //       <li>
// //         <NavLink to="/">Home</NavLink>
// //       </li>
// //       {isLoaded && sessionLinks}
// //     </ul>
// //   );
// // }

// // export default Navigation;
