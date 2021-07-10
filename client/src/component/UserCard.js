import React from 'react'
import Avatar from './Avatar'
import {Link} from 'react-router-dom'

function UserCard({children, user, border, handleClose, setShowFollowers, setShowFollowing }) {

    const handleCloseAll= ()=>{
        if(handleClose) handleClose()
        if(setShowFollowers) setShowFollowers(false)
        if(setShowFollowing) setShowFollowing(false)
    }
    return (
        <div className={`d-flex p-2 align-item-center justify-content-between w-100 ${border}`}>
            <div>
                <Link to={`/profile/${user._id}`} onClick = {handleCloseAll} className="d-flex align-items-center">
                    <Avatar src={user.avatar} size="big-avatar"/>
                    <div className="ml-1">
                        <span className="d-block">{user.username}</span>
                        <small style={{opacity:0.7}}>{user.fullname}</small>
                    </div>
                </Link>
            </div>
            {children}
        </div>
    )
}

export default UserCard
