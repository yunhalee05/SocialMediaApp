import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../component/PostCard';
import { getPostDetail } from '../_actions/postActions';
import { DELETE_POST_RESET, LIKE_POST_RESET, UNLIKE_POST_RESET, UPDATE_POST_RESET } from '../_constants/postConstants';

function Post(props) {

    const postId = props.match.params.id;

    // const [post, setPost] = useState([])

    const detailpost = useSelector(state => state.detailpost)
    const {postdetail, loading, success} = detailpost

    const dispatch = useDispatch()


    const updatepost = useSelector(state => state.updatepost)
    const{success:updatesuccess}  = updatepost

    const deletepost = useSelector(state => state.deletepost)
    const {success:deletesuccess} = deletepost
    
    const likepost = useSelector(state => state.likepost)
    const {success:likesuccess} = likepost

    const unlikepost = useSelector(state => state.unlikepost)
    const {success:unlikesuccess} = unlikepost

    useEffect(() => {
        if(updatesuccess ||deletesuccess ||unlikesuccess ||likesuccess){
            dispatch({type:UPDATE_POST_RESET})
            dispatch({type:DELETE_POST_RESET})
            dispatch({type:LIKE_POST_RESET})
            dispatch({type:UNLIKE_POST_RESET})
        }
        // if((postdetail && postdetail._id !== postId) || !postdetail){
            dispatch(getPostDetail(postId))
        // }
        // if(success){

        //     setPost(postdetail)
        // }
    }, [dispatch, postId, updatesuccess, deletesuccess, unlikesuccess, likesuccess])
    
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
