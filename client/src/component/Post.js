import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, getHomePosts } from '../_actions/postActions'
import { CREATE_POST_RESET, GET_POSTS_RESET, UPDATE_POST_RESET } from '../_constants/postConstants'
import PostCard from './PostCard'

function Post() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()

    const getposts = useSelector(state => state.getposts)
    const {posts} = getposts

    const createpost = useSelector(state => state.createpost)
    const {success} = createpost
    
    const updatepost = useSelector(state => state.updatepost)
    const{success:updatesuccess}  = updatepost

    useEffect(() => {
        if(success||updatesuccess){
            dispatch({type:GET_POSTS_RESET})
            dispatch({type:CREATE_POST_RESET})
            dispatch({type:UPDATE_POST_RESET})
        }

        dispatch(getHomePosts())
    }, [dispatch, success, updatesuccess])

    return (
        <div className="posts">
            {
                posts && 
                posts.map(post=>(
                    <PostCard key={post._id} post={post}></PostCard> 
                ))
            }
        </div>
    )
}

export default Post
