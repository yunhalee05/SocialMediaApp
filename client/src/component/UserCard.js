import React from 'react'
import Avatar from './Avatar'
import {Link} from 'react-router-dom'

function UserCard({children, user, border, handleClose, setShowFollowers, setShowFollowing, msg }) {

    const handleCloseAll= ()=>{
        if(handleClose) handleClose()
        if(setShowFollowers) setShowFollowers(false)
        if(setShowFollowing) setShowFollowing(false)
    }
    return (
        <div className={`d-flex p-2 align-items-center justify-content-between w-100 ${border}`}>
            <div>
                <Link to={`/profile/${user._id}`} onClick = {handleCloseAll} className="d-flex align-items-center">
                    <Avatar src={user.avatar} size="big-avatar"/>
                    <div className="ml-1">
                        <span className="d-block">{user.username}</span>

                        <small style={{opacity:0.7}}>
                            {
                                msg
                                ? <>
                                    <div>{user.text}</div>
                                    {
                                        user.media.length>0 &&
                                         <div>
                                             {user.media.length}
                                             <i className="fas fa-image"></i>
                                         </div>
                                    }
                                </>
                                : user.fullname
                            }
                        </small>
                    </div>
                </Link>
            </div>
            {children}
        </div>
    )
}

export default UserCard
