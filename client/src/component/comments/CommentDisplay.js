import React, { useEffect, useState } from 'react'
import CommentCard from './CommentCard'

function CommentDisplay({comment, post, replyCm}) {
    const [showReply, setShowReply] = useState([])
    const [next, setNext] = useState(1)

    useEffect(() => {
        setShowReply(replyCm.slice(0, next))
    }, [replyCm,next ])

    
    return (
        <div className="comment_display">
            <CommentCard comment={comment} post={post} commentId={comment._id} >
                <div className="pl-4">
                    {
                        showReply.map((item, index) => (
                            item.reply &&
                            <CommentCard
                            key={index}
                            comment={item}
                            post={post}
                            commentId={comment._id}
                             />
                        ))
                    }

                    {
                        replyCm.length - next > 0
                        ? <div style={{cursor: 'pointer', color: 'crimson'}}
                        onClick={() => setNext(next + 10)}>
                            See more comments...
                        </div>

                        : replyCm.length > 1 &&
                        <div style={{cursor: 'pointer', color: 'crimson'}}
                        onClick={() => setNext(1)}>
                            Hide comments...
                        </div>
                    }
                </div>
            </CommentCard>
        </div>
    )
}

export default CommentDisplay
