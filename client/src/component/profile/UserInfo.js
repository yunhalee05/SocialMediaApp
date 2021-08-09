import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Avatar from '../Avatar'
import FollowBtn from '../FollowBtn';
import EditProfile from './EditProfile'
import Followers from './Followers';
import Followings from './Followings';



function UserInfo({user}) {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)
    const [onEdit, setOnEdit] = useState(false)

    

    
    return (
        <div>
            
            {
                user && 
                <div className="info">
                    <div className="info_container " key={user._id}>
                        <div>
                            <h2 className="pl-5 pb-3"><strong>{user.username}</strong></h2>
                            <Avatar src={user.avatar} size="supper-avatar" />
                        </div>

                        <div className="follow_btn text-center"onClick={()=>setShowFollowers(true)}>
                            <div >
                                <strong>{user.followers.length} </strong>
                            </div>
                            <div>Followers</div>
                        </div>

                        <div className="follow_btn text-center" onClick={()=>setShowFollowing(true)}>
                            <div>
                                    <strong>{user.following.length}</strong> 
                            </div>
                            <div>Following</div>
                        </div>

                        {/* <div className="info_content">
                            <div className="follow_btn">
                                <span className="mr-4" onClick={()=>setShowFollowers(true)}>
                                    <strong>{user.followers.length} </strong>Followers
                                </span>
                                <span className="mr-4" onClick={()=>setShowFollowing(true)}>
                                    <strong>{user.following.length}</strong> Following
                                </span>
                            </div>



                        </div>

 */}

                            {
                                onEdit && <EditProfile setOnEdit = {setOnEdit}/>
                            }

                            {
                                showFollowers &&
                                <Followers user = {user} setShowFollowers={setShowFollowers} />

                            }
                            {
                                showFollowing &&
                                <Followings user = {user} setShowFollowing={setShowFollowing}/>

                            }

                    </div>
                    

                    <div className="pl-5 pt-3" >
                            <h6>{user.fullname}</h6>
                            <span className="text-danger">{user?.mobile}</span>
                            <p className="m-0">{user?.address}</p>
                            <h6 className="m-0">{user?.email}</h6>
                            <a href={user?.website} target="_blank"  rel="noreferrer">{user?.website}</a>
                            <p>{user?.story}</p>
                    </div>

                    <div className="info_content_title">
                        {
                            user._id === userInfo.user._id 
                            ? <button className="btn btn-outline-info" onClick={()=>setOnEdit(true)}>Edit Profile</button>
                            :   <FollowBtn user={user} userId={user._id}/>
                        }
                    </div>
                </div>
                }
        </div>
            )
}

export default UserInfo
