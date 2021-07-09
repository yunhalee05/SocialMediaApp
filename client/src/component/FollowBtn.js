import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUserProfile, unfollowUserProfile } from '../_actions/profileActions'

function FollowBtn({user, userId }) {

    const [follow, setFollow] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} =userLogin
    const dispatch = useDispatch()

    useEffect(() => {
        if(userInfo.user.following.find(x=>x._id ===userId)){setFollow(true)}
        else{setFollow(false)}
    }, [userInfo.user.following, userId, user])

    const handleFollow= async ()=>{
        setFollow(true)
        await dispatch(followUserProfile(user))
    }

    const handleUnfollow = async () =>{
        setFollow(false)
        await dispatch(unfollowUserProfile(user))
    }

    return (
        <>
        {

            follow
            ?<button className="btn btn-outline-danger" onClick={handleUnfollow} >UnFollow</button>
            :<button className="btn btn-outline-info" onClick={handleFollow} >Follow</button>
            
        }
        </>
    )
}

export default FollowBtn
