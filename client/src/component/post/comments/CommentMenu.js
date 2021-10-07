import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from '../../../_actions/commentActions'

function CommentMenu({post,comment, setOnEdit}) {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const socket = useSelector(state => state.socket)

    const dispatch = useDispatch()

    const handleRemove = () =>{
        if(post.user._id === userInfo.user._id || comment.user._id ===userInfo.user._id){
            dispatch(deleteComment({post, comment,socket}))
        }
    }
    return (
        <div className="menu">
            {
                (post.user._id === userInfo.user._id || comment.user._id === userInfo.user._id) &&
                <div className="nav-item dropdown">
                    <span className="material-icons" id="moreLink" data-toggle="dropdown">
                        more_vert
                    </span>

                    <div className="dropdown-menu" aria-labelledby="moreLink">
                        {
                            post.user._id === userInfo.user._id
                            ? comment.user._id === userInfo.user._id
                            ?   <>
                                <div className="dropdown-item" onClick={()=>setOnEdit(true)}>
                                    <span className="material-icons">create</span> Edit
                                </div>
                                <div className="dropdown-item" onClick={handleRemove}>
                                    <span className="material-icons">delete_outline</span>Delete
                                </div>
                                </>
                                : <div className="dropdown-item">
                                    <span className="material-icons">delete_outline</span>Remove
                                </div>
                            : comment.user._id ===userInfo.user._id && 
                                <>
                                <div className="dropdown-item" onClick={()=>setOnEdit(true)}>
                                    <span className="material-icons">create</span> Edit
                                </div>
                                <div className="dropdown-item" onClick={handleRemove}>
                                    <span className="material-icons">delete_outline</span>Delete
                                </div>
                                </>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default CommentMenu
