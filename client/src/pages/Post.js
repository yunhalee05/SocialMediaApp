import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../component/PostCard';
import { getPostDetail } from '../_actions/postActions';
import { getProfileUser } from '../_actions/profileActions';
import { DELETE_POST_RESET, LIKE_POST_RESET, UNLIKE_POST_RESET, UPDATE_POST_RESET } from '../_constants/postConstants';
import { BASE_URL } from '../utils';

function Post(props) {

    const postId = props.match.params.id;

    // const [post, setPost] = useState([])

    const detailpost = useSelector(state => state.detailpost)
    const {postdetail,loading, deleteSuccess} = detailpost

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const [postid, setPostid] = useState("")

    const dispatch = useDispatch()

    useEffect(() => {
        if(deleteSuccess){
            window.history.back()
            dispatch({
                type:DELETE_POST_RESET,
            })
        }else if(!deleteSuccess && postid!==postId){
            dispatch(getPostDetail(postId))
            setPostid(postId)
        }
    }, [dispatch, postId, deleteSuccess, postid])
    
    return (
        <div className="posts col-md-8">
            {
                postdetail &&
                <PostCard post={postdetail}/>
            }
        </div>
    )
}

export default Post
