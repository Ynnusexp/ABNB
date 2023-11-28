// frontend/src/components/LoginFormModal/LoginFormModal.jsx

import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { loginDemo } from '../../store/session';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  //const [isDisabled, setIsDisabled] = useState(true);


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="user-form">

          <input
            type="text"
            value={credential}
            placeholder="Username"
            onChange={(e) => {
              //setIsDisabled(e.target.value.length < 4)
              setCredential(e.target.value);
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              //setIsDisabled(e.target.value.length < 6)
              setPassword(e.target.value);
            }}
            required
          />
        {errors.credential && <p style={{color: 'rgb(196, 75, 75)'}}>{errors.credential}</p>}
        <button
          type="submit"
          disabled={credential.length < 4 || password.length < 6}
        >
          Log In
        </button>
        {/* create button for demo user login button. onClick should ping backend login route with demo user's credentials */}

      </form>
      <button className="demo-button"
        onClick={async()=> {
            await dispatch(loginDemo())
            closeModal();
        }}
        >
        Demo User
        </button>
    </>
  );
}

export default LoginFormModal;
