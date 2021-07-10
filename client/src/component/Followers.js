import React from 'react'
import { useSelector } from 'react-redux'
import FollowBtn from './FollowBtn'
import UserCard from './UserCard'

function Followers({user, setShowFollowers}) {
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    return (
        <div className="follow">
            <div className="follow_box">
                <h5 className="text-center">Followers</h5>
                <hr />
                <div className="follow_content">
                    {
                        user.followers.map(follower=>(
                            <UserCard key = {follower._id} user = {follower} setShowFollowers={setShowFollowers}>
                                {
                                    userInfo.user._id !== follower._id && <FollowBtn user={follower} userId = {follower._id}/>
                                }
                            </UserCard>
                        ))
                    }
                </div>
                <div className="close" onClick={()=>setShowFollowers(false)}>&times;</div>

            </div>
        </div>
    )
}

export default Followers
