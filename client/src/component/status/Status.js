import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { STATUS } from '../../_constants/globalConstants'
import Avatar from '../common/Avatar'

function Status() {
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()

    return (
        <div className="status my-3 d-flex">
            <Avatar src={userInfo.user.avatar} size="big-avatar"/>

            <button className="statusBtn flex-fill " onClick={()=>dispatch({type:STATUS, payload:true})}>
                {userInfo.user.username}, What are you thinking?
            </button>
        </div>
    )
}

export default Status
