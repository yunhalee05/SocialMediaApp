import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProfileUser } from '../_actions/profileActions';
import Avatar from '../component/Avatar'
import { PROFILE_GETUSER_RESET, USER_UPDATE_PROFILE_RESET } from '../_constants/profileConstants';
import Loading from '../component/Loading';
import Alert from '../component/Alert'
import EditProfile from '../component/EditProfile'


function Profile(props) {
    const userId = props.match.params.id;
    

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch()

    const userProfile = useSelector(state => state.userProfile)
    const {loading, error, user} = userProfile

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success}  = userUpdateProfile
    

    const [onEdit, setOnEdit] = useState(false)
    

    useEffect(() => {
        if(!user || userId !== user._id || success){
            dispatch({
                type:PROFILE_GETUSER_RESET
            })
            dispatch({
                type:USER_UPDATE_PROFILE_RESET
            })
            dispatch(getProfileUser(userId))
        }
    }, [dispatch, userId, user, userInfo.token,success])

    return (
        <div className="profile">
            {loading&& <Loading></Loading>}
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="info">
                <div className="info_container" key={user?._id}>
                    <Avatar src={user?.avatar} size="supper-avatar" />
                    <div className="info_content">
                        <div className="info_content_title">
                            <h2>{user?.username}</h2>
                            {
                                user?._id === userInfo.user._id 
                                ? <button className="btn btn-outline-info" onClick={()=>setOnEdit(true)}>Edit Profile</button>
                                :   ''
                            }
                        </div>

                        <div className="follow_btn">
                            <span className="mr-4">
                                {user?.followers.length} Followers
                            </span>
                            <span className="mr-4">
                                {user?.following.length} Following
                            </span>
                        </div>

                            <h6>{user?.fullname} <span className="text-danger">{user?.mobile}</span></h6>
                            <p className="m-0">{user?.address}</p>
                            <h6 className="m-0">{user?.email}</h6>
                            <a href={user?.website} target="_blank"  rel="noreferrer">{user?.website}</a>
                            <p>{user?.story}</p>
                        </div>


                        {
                            onEdit && <EditProfile setOnEdit = {setOnEdit}/>
                        }

                </div>
            </div>
        </div>
    )
}

export default Profile
