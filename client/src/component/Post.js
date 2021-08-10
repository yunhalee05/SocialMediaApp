import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHomePosts } from '../_actions/postActions'
import PostCard from './PostCard'
import LoadIcon from '../images/loading.gif'
import Loading from './Loading'
import { ALERT } from '../_constants/globalConstants'
import Alert from './Alert'


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
                getposts.error&&
                <Alert variant="danger">{getposts.error}</Alert>
            }
            {
                getposts.loading
                ? <Loading/>
                : posts && 
                posts.map(post=>(
                    <PostCard key={post._id} post={post}></PostCard> 
                ))
            }

        </div>
    )
}

export default Post
