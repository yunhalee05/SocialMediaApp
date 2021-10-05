import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createComment } from '../../_actions/commentActions'
import Icons from '../Icons'

function InputComment({children,post , onReply, setOnReply}) {

    const [content, setContent] = useState("")
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const socket = useSelector(state => state.socket)
    const dispatch = useDispatch()

    const handleSubmit= (e) =>{
        e.preventDefault()

        if(!content.trim()) {
            if(setOnReply) return setOnReply(false)
            return
        } 

        setContent('')

        const newcomment = {
            content, 
            likes:[],
            user:userInfo.user,
            createdAt : new Date().toISOString(),
            reply: onReply && onReply.commentId,
            tag:onReply && onReply.user
        }
        
        dispatch(createComment({newcomment, post, socket}))

        if(setOnReply) return setOnReply(false)

    }

    return (
        <form className="card-footer comment_input" onSubmit={handleSubmit} >
            {children}
            <input type="text" placeholder="Add your comments ..." value={content} onChange={e=>setContent(e.target.value)} />
           
            <div className="d-flex">
                <div className="flex-fill"></div>
                <Icons setContent={setContent} content={content} />
            </div>

            <button type="submit" className="postBtn">
                Post
            </button>
        </form>
    )
}

export default InputComment
