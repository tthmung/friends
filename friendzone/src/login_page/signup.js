import React, { useState } from "react";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

import "./style.css";

// Check if a string contain a number
function containsNumber(str) {
  return /\d/.test(str);
}

// Check if a string contains lower case letters
function hasLowerCase(str) {
  return str.toUpperCase() === str;
}

// check if a string contains uppercase letters
function hasUpperCase(str) {
  return str.toLowerCase() === str;
}

// check if a string contains special characters
function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

export default function SignUp() {

  const navigate = useNavigate();

  // React States
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if password met requirements.
    if (password.length < 6 || password.length > 15) {
      setErrorMessage("Password must be at least 6 characters and less than 15 characters");
    } else if (!containsNumber(password)) {
      setErrorMessage("Password must contain at least one number");
    } else if (hasLowerCase(password)) {
      setErrorMessage("Password must contain at least one lower case");
    } else if (hasUpperCase(password)) {
      setErrorMessage("Password must contain at least one upper case");
    } else if (!containsSpecialChars(password)) {
      setErrorMessage("Password must contain at least one special characters");
    } else if (password !== rePassword) {
      setErrorMessage("Passwords do not match");
    } else {
      Axios.post('http://127.0.0.1:8080/api/register', {
        email: email,
        password: password,
        name: name,
        introduction: introduction
      }, { withCredentials: true }).then((err) => {
        console.log(err);
      });

      navigate("/");

    }
  };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>email </label>
          <input type="text" name="uname" onChange={e => setEmail(e.target.value)} required />
        </div>

        <div className="input-container">
          <label>name </label>
          <input type="text" name="name" onChange={e => setName(e.target.value)} required />
        </div>

        <div className="input-container">
          <label>short introduction </label>
          <input type="text" name="name" onChange={e => setIntroduction(e.target.value)} />
        </div>

        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" onChange={e => setPassword(e.target.value)} required />
        </div>

        <div className="input-container">
          <label>Retype Password </label>
          <input type="password" name="pass" onChange={e => setRePassword(e.target.value)} required />
        </div>
        <div className="button-container">
          <button className="big-button">Sign Up</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app img2">
      <div className="login-form">
        <div className="title">Sign up</div>
        <h4>{errorMessage}</h4>
        {renderForm}
        <div className="button-container1">
          <label>Have an account?  </label>
          <a href="/sign-in">Log in</a>
        </div>
      </div>
    </div>
  );
}
