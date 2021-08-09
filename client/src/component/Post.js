import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHomePosts } from '../_actions/postActions'
import PostCard from './PostCard'

function Post() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()

    const getposts = useSelector(state => state.getposts)
    const {posts} = getposts

    useEffect(() => {
        dispatch(getHomePosts())
    }, [dispatch])

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
