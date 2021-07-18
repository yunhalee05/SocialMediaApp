import axios from "axios"
import { CREATE_COMMENT_FAIL, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, LIKE_COMMENT_FAIL, LIKE_COMMENT_REQUEST, LIKE_COMMENT_SUCCESS, UNLIKE_COMMENT_FAIL, UNLIKE_COMMENT_REQUEST, UNLIKE_COMMENT_SUCCESS } from "../_constants/commentConstants"
import { UPDATE_POST_SUCCESS } from "../_constants/postConstants"

export const createComment = ({newcomment, post})=> async(dispatch, getState)=>{

    dispatch({
        type:CREATE_COMMENT_REQUEST,
        payload:{loading:true}
    })

    const {userLogin:{userInfo}} = getState()


    try{
        const res = await axios.post('/api/comment', {...newcomment, postId: post._id, postUserId: post.user._id},{
            headers:{authorization:`Bearer ${userInfo.token}`}
        })
        const newpost = {...post, comments:[...post.comments, newcomment]}

        dispatch({
            type:CREATE_COMMENT_SUCCESS,
            payload:res.data.newcomment
        })

        dispatch({
            type:UPDATE_POST_SUCCESS,
            payload:newpost
        })




    }catch(error){
        dispatch({
            type:CREATE_COMMENT_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }

}

export const likeComment = ({comment, post})=>async(dispatch, getState)=>{
    dispatch({
        type:LIKE_COMMENT_REQUEST,
        payload:{loading:true}
    })
    const {userLogin:{userInfo}} = getState()

    try{
        const res = await axios.patch(`/api/comment/${comment._id}/like`, null, {
            headers:{authorization:`Bearer ${userInfo.token}`}
        })

        const newComments = post.comments.map(postcomment=>(
            postcomment._id === comment._id? {comment, likes:[...comment.likes, userInfo.user]} : postcomment
        ))

        const newpost = {...post, comments:newComments}

        dispatch({
            type:LIKE_COMMENT_SUCCESS,
            payload:res.data.comment
        })

        dispatch({
            type:UPDATE_POST_SUCCESS,
            payload:newpost
        })

    }catch(error){
        dispatch({
            type:LIKE_COMMENT_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }}

export const unlikeComment = ({comment, post})=>async(dispatch, getState)=>{
    dispatch({
        type:UNLIKE_COMMENT_REQUEST,
        payload:{loading:true}
    })
    const {userLogin:{userInfo}} = getState()

    try{
        const res = await axios.patch(`/api/comment/${comment._id}/unlike`, null, {
            headers:{authorization:`Bearer ${userInfo.token}`}
        })

        const newComments = post.comments.map(postcomment=>(
            postcomment._id === comment._id? {comment, likes:comment.likes.filter(cm=>cm._id !== userInfo.user._id)} : postcomment
        ))

        const newpost = {...post, comments:newComments}

        dispatch({
            type:UNLIKE_COMMENT_SUCCESS,
            payload:res.data.comment
        })

        dispatch({
            type:UPDATE_POST_SUCCESS,
            payload:newpost
        })

    }catch(error){
        dispatch({
            type:UNLIKE_COMMENT_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }}
