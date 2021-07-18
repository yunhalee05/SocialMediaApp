import React, { useState } from 'react'
import CommentDisplay from '../comments/CommentDisplay'

function Comments({post}) {
    const [comments, setComments] = useState([])


    return (
        <div className="comments">
            {
                post.comments.map(comment=>(
                    <CommentDisplay key = {comment._id} comment = {comment} post = {post}/>
                ))
            }
        </div>
    )
}

export default Comments
