import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProfileUser } from '../_actions/profileActions';
import Loading from '../component/Loading';
import Alert from '../component/Alert'

import SavedPost from '../component/SavedPost'
import UserInfo from '../component/profile/UserInfo';
import PostThumb from '../component/PostThumb';


function Profile(props) {
    const userId = props.match.params.id;
    

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()

    const userProfile = useSelector(state => state.userProfile)
    const {loading, error, user, posts} = userProfile


    const [saveTab, setSaveTab] = useState(false)

    useEffect(() => {
        dispatch(getProfileUser(userId))
    }, [dispatch, userId])

    return (
        <div className="profile">
            {loading&& <Loading></Loading>}
            {error && <Alert variant="danger">{error}</Alert>}
            <UserInfo user={user}/>
            

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
