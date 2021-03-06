import React, { useEffect,useRef,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHomePosts ,getMorePost} from '../../_actions/postActions'
import PostCard from './post_card/PostCard'
import Loading from '../common/Loading'
import Alert from '../common/Alert'


function Post() {

    const dispatch = useDispatch()

    const getposts = useSelector(state => state.getposts)
    const {posts} = getposts

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(9)
    const [isLoadMore, setIsLoadMore] = useState(false)

    
    const pageEnd = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver(entries=>{
            if(entries[0].isIntersecting){
                setIsLoadMore(true)
            }
        },{
            threshold:0.1
        })
        observer.observe(pageEnd.current)
    }, [])

    useEffect(() => {
        if(isLoadMore){
            if(page===1){
                dispatch(getHomePosts())
                setPage(page=>page+1)
                setIsLoadMore(false)
            }else if(getposts.result ===limit){
                dispatch(getMorePost({page, limit}))
                setPage(page=>page+1)
                setIsLoadMore(false)
            }
            
        }
    }, [isLoadMore, dispatch])
    

    return (
        <div className="posts">
            {
                getposts.error&&
                <Alert variant="danger">{getposts.error}</Alert>
            }

            {
                (getposts.loading || getposts.loadMoreLoading) &&
                <Loading/>
            }
            {
                posts && 
                posts.map(post=>(
                    <PostCard key={post._id} post={post}></PostCard> 
                ))
            }
            
            <button style={{marginBottom:'100px', opacity:'0'}} ref={pageEnd}>loadmore</button>
            
        </div>
    )
}

export default Post
