import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../component/PostCard';
import { getPostDetail } from '../_actions/postActions';
import { DELETE_POST_RESET } from '../_constants/postConstants';
import Loading from '../component/Loading';

function Post(props) {

    const postId = props.match.params.id;

    const detailpost = useSelector(state => state.detailpost)
    const {postdetail,loading, deleteSuccess} = detailpost


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
                loading && 
                <Loading></Loading>
            }
            {
                postdetail &&
                <PostCard post={postdetail}/>
            }
        </div>
    )
}

export default Post
