import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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

    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(3)
    const [load, setLoad] = useState(false)
    const [page, setPage] = useState(2)
    const [posts, setPosts] = useState([])

    const dispatch = useDispatch();    

    const discoverpost = useSelector(state => state.discoverpost)
    const {discoverpost:discoveredpost, loading, result, firstLoad} = discoverpost;

    useEffect(() => {
        if(!firstLoad){
            dispatch(getDiscoverPost())
        }
    },[dispatch, firstLoad,page, limit])

    const onLoadMore = async() =>{
        setLoad(true)
        const res = await axios.get(`/api/discover?num=${page*9}`,{
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
                
                loading
                ? <Loading></Loading>
                : discoveredpost && <PostThumb posts={discoveredpost} result={discoveredpost} />

            }
            {
                load && <Loading></Loading>
            }

            {
                !loading &&
                result<9*(page-1) ? '':
                    <button className="btn btn-dark mx-auto d-block" onClick={onLoadMore}>LoadMore</button>

            }
        </div>

    )
}

export default Discover
