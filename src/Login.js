import React from "react";
import "./Login.css";
import { auth, provider } from "./firebase";
import { actionTypes } from "./Reducer";
import { useStateValue } from "./StateProvider";
const Login = () => {
  const [dispatch] = useStateValue();
  const SignIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="login_container">
      <div className="login">
        <img
          className="loginimg"
          src="https://res.cloudinary.com/dehghhzey/image/upload/v1683045843/connectimg_qm3bal.jpg"
          alt=""
        />
        <div className="login_text">
          <h1> Connect via Chat</h1>
        </div>
        <button className="signin" onClick={SignIn} type="submit">
          Sign in With Google
        </button>
      </div>
    </div>
  );
};

export default Login;
