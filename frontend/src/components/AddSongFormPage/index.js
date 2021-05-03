import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { addSong } from "../../store/song";

import './AddSongForm.css';

function AddSongFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const [coverArt, setCoverArt] = useState(null);
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (password === confirmPassword) {
    //   setErrors([]);
    //   return dispatch(sessionActions.signup({ email, username, profilePicture, headerPicture, password }))
    //     // .then(() => {
    //     //   setEmail("");
    //     //   setUsername("");
    //     //   setProfilePicture(null);
    //     //   setHeaderPicture(null);
    //     //   setPassword("");
    //     //   setConfirmPassword("");
    //     // })
    //     .catch(async (res) => {
    //       const data = await res.json();
    //       if (data && data.errors) setErrors(data.errors);
    //     });
    // }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form onSubmit={handleSubmit} className='addSongForm'>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Title
        <input
          className="titleInput"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Song File
        <input
          className="songFileInput"
          type="file"
          onChange={(e) => setFileUrl(e.target.files[0])}
          required
        />
      </label>
      <label>
        Cover Art
        <input
          className="coverArtInput"
          type="file"
          onChange={(e) => {if (e.target.files[1]) setCoverArt(e.target.files[1])}}
        />
      </label>
      <button type="submit" className="addSongButton">Add Song</button>
    </form>
  );
}

export default AddSongFormPage;
