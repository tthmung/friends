import React, { useState } from "react";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./style.css";
import logo from '../images/MichiganTech_Vertical_OneColor_Black.png';


export default function Login() {

  // React States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    Axios.post('http://127.0.0.1:8080/api/login', {
      email: email,
      password: password
    }, { withCredentials: true }).then((response) => {
      if (response.data.message) {
        setErrorMessage(response.data.message);
      }
      if (response.data.result) {
        navigate("/main");
      }
    });
  }

  return (
    <div className="app img1">
      <div className="login-form">
        <div className="imgcontainer">
          <img className="img-front" src={logo} alt="" />
        </div>
        <div className="title">Please Sign In</div>
        <h4>{errorMessage}</h4>
        <div className="form">
          <form onSubmit={login}>

            <div className="input-container">
              <label>email </label>
              <input type="text" name="uname" onChange={e => setEmail(e.target.value)} required />
            </div>

            <div className="input-container">
              <label>Password </label>
              <input type="password" name="pass" onChange={e => setPassword(e.target.value)} required />
            </div>

            <div className="button-container">
              <input className="big-button" name="log-in" type="submit" value="Log in" />
            </div>
          </form>

          <div className="button-container">
            <a className="big-button" href="/sign-up">Sign Up</a>
          </div>

        </div>
      </div>
    </div>
  );
}
