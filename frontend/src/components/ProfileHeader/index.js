import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ProfileHeader.css"

export default function ProfileHeader() {
    const sessionUser = useSelector((state) => state.session.user);
    console.log(sessionUser.profilePictureUrl);
    const { profilePictureUrl, headerPictureUrl, username } = sessionUser;

    return (
        <div className='profileHeader'>
            <img src={headerPictureUrl} alt='Header' className='headerPicture'></img>
            <img src={profilePictureUrl} alt='Profile' className='profilePicture'></img>
            <div className='artistName'>{username}</div>
        </div>
    )
}
