import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createComment } from '../../_actions/commentActions'

function InputComment({children,post}) {

    const [content, setContent] = useState("")

    const theme = useSelector(state => state.theme)
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()

    const handleSubmit= (e) =>{
        e.preventDefault()

        if(!content.trim()) return 

        const newcomment = {
            content, 
            likes:[],
            user:userInfo.user,
            createdAt : new Date().toISOString()
        }
        
        dispatch(createComment({newcomment, post}))

    }

    return (
        <form className="card-footer comment_input" onSubmit={handleSubmit} >
            {children}
            <input type="text" placeholder="Add your comments ..." value={content} onChange={e=>setContent(e.target.value)} style={{filter: theme? 'invert(1)': 'invert(0)', color: theme? 'white':'#111', background:theme? 'rgba(0,0,0,.03)':''}}/>

            <button type="submit" className="postBtn">
                Post
            </button>
        </form>
    )
}

export default InputComment
