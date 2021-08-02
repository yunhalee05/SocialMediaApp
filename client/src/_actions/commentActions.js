import axios from "axios"
import { CREATE_COMMENT_FAIL, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, DELETE_COMMENT_FAIL, DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, LIKE_COMMENT_FAIL, LIKE_COMMENT_REQUEST, LIKE_COMMENT_SUCCESS, UNLIKE_COMMENT_FAIL, UNLIKE_COMMENT_REQUEST, UNLIKE_COMMENT_SUCCESS, UPDATE_COMMENT_FAIL, UPDATE_COMMENT_REQUEST, UPDATE_COMMENT_SUCCESS } from "../_constants/commentConstants"
import { UPDATE_POST_SUCCESS } from "../_constants/postConstants"

export const createComment = ({newcomment, post, socket})=> async(dispatch, getState)=>{

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

        socket.emit('createComment', newpost)

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

export const updateComment = ({comment, post, content})=>async(dispatch, getState)=>{
    dispatch({
        type:UPDATE_COMMENT_REQUEST,
        payload:{loading:true}
    })
    const {userLogin:{userInfo}} = getState()

    try{
        const res = await axios.patch(`api/comment/${comment._id}`, {content},{
            headers:{authorization:`Bearer ${userInfo.token}`}
        })

        const newComments = post.comments.map(postcomment =>(
            postcomment._id ===comment._id? {...comment, content}: postcomment
        ))
        const newpost = {...post, comments:newComments}

        dispatch({
            type:UPDATE_COMMENT_SUCCESS,
            payload:res.data.comment
        })

        dispatch({
            type:UPDATE_POST_SUCCESS,
            payload:newpost
        })

    }catch(error){
        dispatch({
            type:UPDATE_COMMENT_FAIL,
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


export const deleteComment= ({post, comment, socket})=>async(dispatch, getState)=>{

    dispatch({
        type:DELETE_COMMENT_REQUEST,
        payload:{loading:true}
    })

    const {userLogin:{userInfo}} = getState()

    try{

        const deleteArr = [...post.comments.filter(cm=>cm.reply === comment._id), comment]
        const newpost = {...post, comments:post.comments.filter(cm=>!deleteArr.find(da=>cm._id ===da._id))}
       
        deleteArr.forEach(async(deletecm)=>{
             await axios.delete(`/api/comment/${deletecm._id}`, {
                headers:{authorization:`Bearer ${userInfo.token}`}
            })

        })

        socket.emit('deleteComment', newpost)

        dispatch({
            type:DELETE_COMMENT_SUCCESS,
            payload:deleteArr
        })

        dispatch({
            type:UPDATE_POST_SUCCESS,
            payload:newpost
        })

    }catch(error){
        dispatch({
            type:DELETE_COMMENT_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}