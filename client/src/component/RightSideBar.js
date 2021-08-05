import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from './UserCard'
import LoadIcon from '../images/loading.gif'
import FollowBtn from './FollowBtn'
import { getSuggestions } from '../_actions/suggestionActions'

function RightSideBar() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const suggestion = useSelector(state => state.suggestion)

    const dispatch = useDispatch()

    
    useEffect(() => {
        if(userInfo.token){
            dispatch(getSuggestions())
        }
    }, [userInfo.token, dispatch])


    return (
        <div className="mt-3">

            <UserCard user={userInfo.user}/>

            <div className="d-flex justify-content-between align-items-center my-2">
                <h5 className="text-danger">Suggestions for you </h5>
                {
                    !suggestion.loading &&
                    <i className="fas fa-redo" style={{cursor:'pointer'}} onClick={()=>dispatch(getSuggestions())}/>
                }
            </div>

            {
                suggestion.loading
                ? <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4"/>
                : suggestion.users &&
                <div className="suggeston">
                    {
                        suggestion.users.map(user=>(
                            <UserCard key={user._id}  user={user}>
                                <FollowBtn user={user} userId={user._id}/>
                            </UserCard>
                        ))
                    }
                </div>
            }

            
        </div>
    )
}

export default RightSideBar
