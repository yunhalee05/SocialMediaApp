import React, { useEffect, useState } from 'react'
import Avatar from '../Avatar'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import LIkeButton from '../LIkeButton'
import InputComment from '../post_card/InputComment'
import CommentMenu from './CommentMenu'
import { likeComment, unlikeComment, updateComment } from '../../_actions/commentActions'

function CommentCard({children, comment, post, commentId}) {

    const [onEdit, setOnEdit] = useState(false)
    const [content, setContent] = useState(comment.content)
    const [readMore, setReadMore] = useState(false)
    const [onReply, setOnReply] = useState(false)
    const [isLike, setIsLike] = useState(false)

    const theme = useSelector(state => state.theme)
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()
    

    useEffect(() => {
        setIsLike(false)
        setOnReply(false)
        if(comment.likes.find(like=>like._id ===userInfo.user._id)){
            setIsLike(true)
        }
    }, [comment, userInfo.user._id])


    const handleLike = () =>{
        if(isLike){
            dispatch(unlikeComment({comment, post}))
            setIsLike(false)
        }
        else{
            dispatch(likeComment({comment, post}))
            setIsLike(true)
        }
    }

    const handleReply= () =>{
        if(onReply) return setOnReply(false)
        setOnReply({...comment, commentId})

    }
    const handleUpdate=() =>{
        if(comment.content !==content){
            dispatch(updateComment({comment, post, content}))
            setOnEdit(false)
        }else{
            setOnEdit(false)
        }

    }
    
    return (
        <div className="comment_card mt-2" style={{opacity:comment._id? 1:0.5, pointerEvents:comment._id? 'inherit': 'none'}}>
            <Link to={`/profile/${comment.user._id}`} className="d-flex text-dark">
                <Avatar src={comment.user.avatar} size="small-avatar"/>
                <h6 className="mx-1">{comment.user.username}</h6>
            </Link>

            <div className="comment_content">
                <div className="flex-fill" style={{filter:theme? 'invert(1)' : 'invert(0)', color:theme? 'white':'#111'}}>
                    {
                        onEdit
                        ? <textarea rows="5" value={content} onChange={e=>setContent(e.target.value)} />
                        : <div>
                            {
                                comment.tag && comment.tag._id !== comment.user._id &&
                                <Link to={`/profile/${comment.tag._id}`} className="mr-1">
                                    @{comment.tag.username}
                                </Link>
                            }
                            <span>
                                {
                                    content?.length <100 ? content:
                                    readMore? content + ' ' : content?.slice(0, 100) + '....'
                                }
                            </span>
                            {
                                content?.length > 100 &&
                                <span className="readMore" onClick={()=>setReadMore(!readMore)}>
                                    {readMore? 'Hide content' : 'Read more'}
                                </span>
                            }
                        </div>
                    }
                    <div style={{cursor:'pointer'}}>
                        <small className="text-muted mr-3">
                            {moment(comment.createdAt).fromNow()}
                        </small>
                        <small className="font-weight-bold mr-3">
                            {comment.likes.length} likes
                        </small>
                        {
                            onEdit
                            ? <>
                                <small className="font-weight-bold mr-3" onClick={handleUpdate}>
                                    update
                                </small>
                                <small className="font-weight-bold mr-3" onClick={()=>setOnEdit(false)}>
                                    cancel
                                </small>
                            </>
                            : <small className="font-weight-bold mr-3" onClick={handleReply}>
                                {onReply? 'cancel': 'reply'}
                            </small>
                        }
                    </div>
                </div>

                <div className="d-flex align-items-center mx-2">
                    <CommentMenu post = {post} comment = {comment} setOnEdit={setOnEdit}/>
                    <LIkeButton isLike={isLike} handleLike={handleLike}/>
                    
                </div>
            </div>
            {
                onReply &&
                <InputComment post = {post} onReply={onReply} setOnReply={setOnReply}>
                    <Link to={`/profile/${onReply.user._id}`} className="mr-1">
                        @{onReply.user.username}
                    </Link>
                </InputComment>
            }

            {children}
        </div>
    )
}

export default CommentCard
