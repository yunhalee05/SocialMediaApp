import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import Send from '../../images/send.svg'
import { likePost, unlikePost } from '../../_actions/postActions'
import LikeButton from '../LIkeButton'

function CardFooter({post}) {
    const [isLike, setIsLike] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if(post.likes.find(like=> like._id===userInfo.user._id)){
            setIsLike(true)
        }else{
            setIsLike(false)
        }
    }, [post.likes, userInfo.user._id])

    const handleLike = () =>{
        if(!isLike){
            dispatch(likePost(post))
        }else{
            dispatch(unlikePost(post))
        }
        setIsLike(!isLike)

    }

    return (
        <div className="card_footer">
            <div className="card_icon_menu">
                <div>
                    <LikeButton isLike = {isLike} handleLike={handleLike} />
                    <Link to={`/post/${post._id}`} className="text-dark">
                        <i className="far fa-comment"></i>
                    </Link>

                    <img src={Send} alt="Send" />

                </div>

                <i className="far fa-bookmark"></i>
            </div>

            <div className="d-flex justify-content-between">
                <h6 style={{padding: '0 25px', cursor:'pointer'}}>{post.likes.length} likes</h6>
                <h6 style={{padding: '0 25px', cursor:'pointer'}}>{post.comments.length} comments</h6>
            </div>
        </div>
    )
}

export default CardFooter
