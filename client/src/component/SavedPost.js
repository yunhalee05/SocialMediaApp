import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSavePost, setSavePost } from '../_actions/postActions'
import { ALERT } from '../_constants/globalConstants'
import { GET_SAVE_POST_UPDATE } from '../_constants/postConstants'
import PostThumb from './PostThumb'
import LoadIcon from '../images/loading.gif'

function SavedPost() {

    const [savedPosts, setSavedPosts] = useState([])
    const [result, setResult] = useState(9)
    const [page, setPage] = useState(2)
    const [load, setLoad] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()

    useEffect(() => {
        setLoad(true)
        axios.get('/api/post/profile/savedposts', {
            headers:{authorization:`Bearer ${userInfo.token}`},
        }).then(response=>{
            setSavedPosts(response.data.savedposts)
            setResult(response.data.result)
            setLoad(false)
        })
        .catch(err=>{
            dispatch({
                type:ALERT, 
                payload:{error:err.data.message}
            })
        })
        return ()=>setSavedPosts([])
    }, [userInfo.token, dispatch])

    const handleLoadMore = async() =>{
        setLoad(true)
        const res = await axios.get(`/api/post/profile/savedposts?limit=${page*9}`,{
        headers:{authorization:`Bearer ${userInfo.token}`},
        })
        setSavedPosts(res.data.savedposts)
        setResult(res.data.result)
        setPage(page+1)
        setLoad(false)
    }

    return (
        <div>
            

            {
                load
                ? <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                :  
                    <>
                    
                        <PostThumb posts={savedPosts} result={result}/>
                        {
                            result < 9*(page-1) 
                            ? ''
                            :<button className="btn btn-dark mx-auto d-block" onClick={handleLoadMore}>LoadMore</button>
                        }
                                     
                    </>
            }



        </div>
    )
}

export default SavedPost
