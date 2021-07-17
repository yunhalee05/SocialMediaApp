import axios from "axios"
import { CREATE_COMMENT_FAIL, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS } from "../_constants/commentConstants"
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
