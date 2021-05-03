import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [headerPicture, setHeaderPicture] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, profilePicture, headerPicture, password }))
        // .then(() => {
        //   setEmail("");
        //   setUsername("");
        //   setProfilePicture(null);
        //   setHeaderPicture(null);
        //   setPassword("");
        //   setConfirmPassword("");
        // })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form onSubmit={handleSubmit} className='signupForm'>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Email
        <input
          className="emailInput"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Username
        <input
          className="usernameInput"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Profile Picture (optional)
        <input
          className="profilePictureInput"
          type="file"
          onChange={(e) => {if (e.target.files[0]) setProfilePicture(e.target.files[0])}}
        />
      </label>
      <label>
        Header Picture (optional)
        <input
          className="headerPictureInput"
          type="file"
          onChange={(e) => {if (e.target.files[0]) setHeaderPicture(e.target.files[0])}}
        />
      </label>
      <label>
        Password
        <input
          className="passwordInput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password
        <input
          className="confirmPasswordInput"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="signupButton">Sign Up</button>
    </form>
  );
}

export default SignupFormPage;
