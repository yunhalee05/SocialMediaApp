import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProfileUser } from '../_actions/profileActions';
import Loading from '../component/common/Loading';
import Alert from '../component/common/Alert'

import SavedPost from '../component/profile/SavedPost'
import UserInfo from '../component/profile/UserInfo';
import PostThumb from '../component/common/PostThumb';


function Profile(props) {
    const userId = props.match.params.id;
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfileUser(userId))
    }, [dispatch, userId])

    // const userLogin = useSelector(state => state.userLogin)
    // const {userInfo} = userLogin


    const userProfile = useSelector(state => state.userProfile)
    const {loading, error, user, posts} = userProfile


    const [saveTab, setSaveTab] = useState(false)



    return (
        <div className="profile">
            {loading&& <Loading></Loading>}
            {error && <Alert variant="danger">{error}</Alert>}
            {
                user && 
                <UserInfo user={user}/>
            }
            {
                <div className="profile_tab">
                    <button className={saveTab? '': 'active'} onClick={()=>setSaveTab(false)}><i className="far fa-images fa-2x"></i></button>
                    <button className={saveTab? 'active': ''} onClick={()=>setSaveTab(true)}><i className="far fa-save fa-2x"></i></button>
                </div>
            }

            { 
                posts && user&& saveTab
                ? <SavedPost/>
                : <PostThumb posts={posts}/>
                
            }
        </div>
    )
}

export default Profile
