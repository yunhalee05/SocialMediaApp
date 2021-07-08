import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileUsers } from '../_actions/profileActions'
import Avatar from './Avatar'

function Info({user}) {


    
    return (
        <div className="info">
            <div className="info_container" key={user._id}>
                <Avatar src={user.avatar} size="supper-avatar" />
                <div className="info_content">
                    <div className="info_content_title">
                        <h2>{user.username}</h2>
                        <button className="btn btn-outline-info">Edit Profile</button>
                    </div>
                    <div>
                        <span>
                            {user.followers.length} Followers
                        </span>
                        <span>
                            {user.following.length} Following
                        </span>
                    </div>

                    <h6>{user.fullname}</h6>
                    <p>{user.address}</p>
                    <h6>{user.email}</h6>
                    <a href={user.website} target="_blank"  rel="noreferrer">{user.website}</a>
                    <p>{user.story}</p>
                </div>
            </div>
        </div>
    )
}

export default Info
