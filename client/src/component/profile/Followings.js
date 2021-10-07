import React from 'react'
import { useSelector } from 'react-redux'
import FollowBtn from '../common/FollowBtn'
import UserCard from '../common/UserCard'

function Followings({user, setShowFollowing}) {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    return (
        <div className="follow">
            <div className="follow_box">
                <h5 className="text-center">Following</h5>
                <hr />
                <div className="follow_content">
                    {
                        user.following.map(following=>(
                            <UserCard key={following._id} user={following} setShowFollowing={setShowFollowing}>
                                {
                                    userInfo.user._id !== following._id && <FollowBtn user={following} userId={following._id}/>
                                }
                            </UserCard>
                        ))
                    }
                </div>
                <div className="close" onClick={()=>setShowFollowing(false)}>&times;</div>
            </div>
        </div>
    )
}

export default Followings
