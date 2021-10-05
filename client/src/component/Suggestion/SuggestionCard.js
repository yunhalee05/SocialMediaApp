import React from 'react'
import Avatar from '../Avatar'
import {Link} from 'react-router-dom'

function SuggestionCard({user, children}) {
    return (
        <div className={`d-flex p-3 align-items-center w-80`} style={{background:'white', margin:'10px', border:' 1px solid #dbdbdb', borderRadius:'10%'}}>
            <div >
                <Link to={`/profile/${user._id}`} className="align-items-center">
                    <div >
                        <Avatar src={user.avatar} size="super-avatar"/>
                    </div>
                    <div className="mt-1 text-center">
                        <span className="text-center" style={{color:'black', fontSize:'1rem'}}>{user.username}</span>
                    </div>
                </Link>
                <div className="text-center">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default SuggestionCard
