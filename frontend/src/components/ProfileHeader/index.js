import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ProfileHeader.css"

export default function ProfileHeader() {
    return (
        <div className='profileHeader'>
            <img src='' alt='Header'></img>
            <div className='profilePicture'>
                <img src='' alt='Profile'></img>
            </div>
            <div>Artist Name</div>
        </div>
    )
}
