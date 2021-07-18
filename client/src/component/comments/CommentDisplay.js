import React from 'react'
import CommentCard from './CommentCard'

function CommentDisplay({comment, post}) {
    return (
        <div className="comment_display">
            <CommentCard comment = {comment} post = {post} />
        </div>
    )
}

export default CommentDisplay
