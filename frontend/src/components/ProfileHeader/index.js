import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ProfileHeader.css"

export default function ProfileHeader() {
    return (
        <div className='profileHeader'>
            <img src=''></img>
            <div className='profilePicture'>
                <img src=''></img>
            </div>
            <div>Artist Name</div>
        </div>
    )
}
