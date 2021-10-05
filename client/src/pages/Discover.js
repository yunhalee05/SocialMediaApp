import axios from 'axios'
import React, { useEffect, useState,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../component/Alert'
import Loading from '../component/Loading'
import PostThumb from '../component/PostThumb'
import { getDiscoverPost } from '../_actions/postActions'
import { GET_DISCOVER_POST_RESET, GET_DISCOVER_POST_UPDATE } from '../_constants/postConstants'

function Discover({props}) {
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    if(!userInfo){
        props.history.push('/login')
    }

    const [load, setLoad] = useState(false)
    const [page, setPage] = useState(1)

    const dispatch = useDispatch();    

    const discoverpost = useSelector(state => state.discoverpost)
    const {posts:discoveredpost, loading,error} = discoverpost;

    useEffect(() => {
        dispatch(getDiscoverPost())
    },[dispatch])

    const pageEnd = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver(entries=>{
            if(entries[0].isIntersecting){
                onLoadMore()
            }
        },{
            threshold:0.1
        })
        observer.observe(pageEnd.current)
    }, [])

    const onLoadMore = async() =>{
        setLoad(true)
        const res = await axios.get(`/api/discover?page=${page+1}`,{
        headers:{authorization:`Bearer ${userInfo.token}`},
        })

        dispatch({
        type:GET_DISCOVER_POST_UPDATE,
        payload:res.data
        })
        
        setPage(page+1)
        setLoad(false)
    }


    return (
        <div>
            {
                error &&
                <Alert variant="danger">{error}</Alert>
            }
            {
                
                loading
                ? <Loading></Loading>
                : discoveredpost && <PostThumb posts={discoveredpost} result={discoveredpost} />

            }
            <button className="btn btn-dark mx-auto d-block" style={{marginBottom:'100px', opacity:'0'}} ref={pageEnd}>LoadMore</button>
            {
                load &&
                <Loading></Loading>
            }
        </div>

    )
}

export default Discover
