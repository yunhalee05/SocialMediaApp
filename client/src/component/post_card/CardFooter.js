import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import Send from '../../images/send.svg'
import { likePost, setSavePost, setUnsavePost, unlikePost } from '../../_actions/postActions'
import LikeButton from '../LIkeButton'
import ShareModal from '../ShareModal'
import {BASE_URL} from '../../utils'

function CardFooter({post}) {
    const [isLike, setIsLike] = useState(false)

    const [isShare, setIsShare] = useState(false)
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const [isSaved, setIsSaved] = useState(false)

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

    useEffect(() => {
        if(userInfo.user.saved.find(id=>id===post._id)){
            setIsSaved(true)
        }else{
            setIsSaved(false)
        }
    }, [userInfo.user.saved, post._id])

    const handleSavePost= () =>{
        if(!isSaved){
            dispatch(setSavePost(post))

        }else{
            dispatch(setUnsavePost(post))
        }
        setIsSaved(!isSaved)
    }

    return (
        <div className="card_footer">
            <div className="card_icon_menu">
                <div>
                    <LikeButton isLike = {isLike} handleLike={handleLike} />
                    <Link to={`/post/${post._id}`} className="text-dark">
                        <i className="far fa-comment"></i>
                    </Link>

                    <img src={Send} alt="Send" onClick={()=>setIsShare(!isShare)}/>

                </div>

                {
                    isSaved
                    ? <i className="fas fa-bookmark text-info" onClick={handleSavePost}></i>
                    : <i className="far fa-bookmark " onClick={handleSavePost}></i>
                }

            </div>

            <div className="d-flex justify-content-between">
                <h6 style={{padding: '0 25px', cursor:'pointer'}}>{post.likes.length} likes</h6>
                <h6 style={{padding: '0 25px', cursor:'pointer'}}>{post.comments.length} comments</h6>
            </div>

            {

                isShare &&
                <ShareModal url={`${BASE_URL}/post/${post._id}`}/>
            }
        </div>
    )
}

export default CardFooter
