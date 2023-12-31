import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import * as sessionActions from "./store/session";
import { getSpotsFetch } from "./store/spots";
//import SpotTile from './components/SpotTile/spotTile';
import HomePage from "./components/HomePage/HomePage.jsx";
import SpotPage from "./components/SpotPage/SpotPage";
import CreateForm from "./components/CreateForm/CreateForm"
import ManageSpots from "./components/ManageSpots/ManageSpots";
import UpdateForm from "./components/UpdateForm/UpdateForm";
import "./App.css"
import { Modal, ModalProvider } from './context/Modal'; //

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getSpotsFetch());
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    // <div>
    //   <Navigation isLoaded={isLoaded} />
    //   {isLoaded && <Outlet />}
    // </div>
/////////////////////////////////
    <>
      <ModalProvider>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && <Outlet />}
        <Modal />
      </ModalProvider>
    </>
///////////////////////////////////////
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",

        element: (
          <>
            <HomePage />,
          </>
        ),
      },
      {
        path: "/spots/:spotId",

        element: <SpotPage />,
      },
      {
        path: "/spots/:spotId/edit",

        element: <UpdateForm />,
      },
      {
        path: "/managespots",

        element: <ManageSpots />,
      },
      {
        path: "/spots/create",

        element: <CreateForm />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

// // frontend/src/App.jsx

// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import SignupFormPage from './components/SignupFormModal/SignupFormModal';
// import Navigation from './components/Navigation/Navigation';
// import * as sessionActions from './store/session';

// function Layout() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     dispatch(sessionActions.restoreUser()).then(() => {
//       setIsLoaded(true)
//     });
//   }, [dispatch]);

//   return (
//     <>
//       <Navigation isLoaded={isLoaded} />
//       {isLoaded && <Outlet />}
//     </>
//   );
// }

// const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       {
//         path: '/',
//         element: <h1>Welcome!</h1>
//       },
//       {
//         path: "signup",
//         element: <SignupFormPage />
//       }
//     ]
//   }
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;

// // frontend/src/App.jsx

// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage/SignupFormPage';
// import Navigation from './components/Navigation/Navigation';
// import * as sessionActions from './store/session';

// function Layout() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     dispatch(sessionActions.restoreUser()).then(() => {
//       setIsLoaded(true)
//     });
//   }, [dispatch]);

//   return (
//     <>
//       <Navigation isLoaded={isLoaded} />
//       {isLoaded && <Outlet />}
//     </>
//   );
// }

// const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       {
//         path: '/',
//         element: <h1>Welcome!</h1>
//       },
//       {
//         path: "login",
//         element: <LoginFormPage />
//       },
//       {
//         path: "signup",
//         element: <SignupFormPage />
//       }
//     ]
//   }
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;
