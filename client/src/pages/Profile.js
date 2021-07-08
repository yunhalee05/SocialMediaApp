import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Info from '../component/Info'
import { getProfileUser } from '../_actions/profileActions';
import Avatar from '../component/Avatar'
import { PROFILE_GETUSER_RESET } from '../_constants/profileConstants';
import Loading from '../component/Loading';
import Alert from '../component/Alert'


function Profile(props) {
    const userId = props.match.params.id;
    

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch()

    const userProfile = useSelector(state => state.userProfile)
    const {loading, error, user} = userProfile


    useEffect(() => {
        if(!user || userId !== user._id){
            dispatch(getProfileUser(userId))
        }
    }, [dispatch, userId, user])

    return (
        <div className="profile">
            {loading&& <Loading></Loading>}
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="info">
                <div className="info_container" key={user?._id}>
                    <Avatar src={user?.avatar} size="supper-avatar" />
                    <div classNamåe="info_content">
                        <div className="info_content_title">
                            <h2>{user?.username}</h2>
                            {
                                user?._id === userInfo.user._id 
                                ? <button className="btn btn-outline-info">Edit Profile</button>
                                :   ''
                            }
                        </div>
                        <div>
                            <span>
                                {user?.followers.length} Followers
                            </span>
                            <span>
                                {user?.following.length} Following
                            </span>
                        </div>

                        <h6>{user?.fullname}</h6>
                        <p>{user?.address}</p>
                        <h6>{user?.email}</h6>
                        <a href={user?.website} target="_blank"  rel="noreferrer">{user?.website}</a>
                        <p>{user?.story}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
