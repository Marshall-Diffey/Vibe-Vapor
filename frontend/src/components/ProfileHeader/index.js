import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ProfileHeader.css"

export default function ProfileHeader() {
    const sessionUser = useSelector((state) => state.session.user);
    console.log(sessionUser.profilePictureUrl);
    const { profilePictureUrl, headerPictureUrl } = sessionUser;

    return (
        <div className='profileHeader'>
            <img src={headerPictureUrl} alt='Header'></img>
            <div className='profilePicture'>
                <img src={profilePictureUrl} alt='Profile'></img>
            </div>
            <div>Artist Name</div>
        </div>
    )
}
