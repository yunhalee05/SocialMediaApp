import React from 'react'
import Avatar from '../../common/Avatar'
import {Link, useHistory}  from 'react-router-dom'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { EDITSTATUS, STATUS } from '../../../_constants/globalConstants'
import { deletePost } from '../../../_actions/postActions'

function CardHeader({post}) {
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    const dispatch = useDispatch()
    const history = useHistory()

    const handleEditPost = () =>{
        dispatch({
            type:STATUS,
            payload:true
        })
        dispatch({
            type:EDITSTATUS,
            payload:{
                ...post,
                onEdit:true,
            }
        })

    }
    const handleDeletePost= () =>{
        if(window.confirm("Are you wure want to delete this post?")){
            dispatch(deletePost({post}))
        }

    }

    const handleCopyLink= () =>{
        navigator.clipboard.writeText(`http://localhost:3000/post/${post._id}`)
    }

    return (
        <div className="card_header">
            <div className="d-flex">
                <Avatar src={post.user.avatar} size="big-avatar"/>
                <div className="card_name ml-2">
                    <h6 className="m-0">
                        <Link to={`/profile/${post.user._id}`} className="text-dark">
                            {post.user.username}
                        </Link>
                    </h6>
                    <small className="text-muted">
                        {moment(post.createdAt).fromNow()}
                    </small>
                </div>
            </div>

            <div className="nav-item dropdown">
                <span className="material-icons" id="moreLink" data-toggle="dropdown">
                    more_horiz
                </span>
                <div className="dropdown-menu">
                    {
                        userInfo.user._id ===post.user._id &&
                        <>
                            <div className="dropdown-item" onClick={handleEditPost}>
                                <span className="material-icons" >create</span> Edit Post
                            </div>
                            <div className="dropdown-item"  onClick = {handleDeletePost}>
                                <span className="material-icons">delete_outline</span> Remove Post
                            </div>
                        </>
                    }
                    <div className="dropdown-item" onClick={handleCopyLink}>
                        <span className="material-icons">content_copy</span> Copy Link
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardHeader
