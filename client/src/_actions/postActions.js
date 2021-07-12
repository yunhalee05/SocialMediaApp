import axios from "axios"
import { CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, DELETE_POST_FAIL, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, GET_HOME_POSTS_FAIL, GET_HOME_POSTS_REQUEST, GET_HOME_POSTS_SUCCESS, UPDATE_POST_FAIL, UPDATE_POST_REQUEST, UPDATE_POST_SUCCESS } from "../_constants/postConstants"

export const createPost = ({content, Images})=> async(dispatch, getState)=>{
    const {userLogin:{userInfo}} = getState()
    dispatch({
        type:CREATE_POST_REQUEST,
        payload:{loading:true}
    })
    try{
        let imgArr = [];
        if(Images.length>0){
            for(const item of Images){
                const bodyFormData = new FormData()
                if(item.camera){
                    bodyFormData.append("image", item.camera)
                }else{
                    bodyFormData.append("image", item)
                }
                const data = await axios.post('/api/postuploads', bodyFormData,{
                    headers:{'Content-Type' : 'multipart/form-data', authorization:`Bearer ${userInfo.token}`}
                })
                imgArr.push(data)
            }
        }
        const res = await axios.post('/api/post', {content, images:imgArr, userId:userInfo.user._id,user:userInfo.user},{
            headers:{authorization:`Bearer ${userInfo.token}`}
        })
        dispatch({
            type:CREATE_POST_SUCCESS,
            payload:res.data.newPost
        })

    }catch(error){
        dispatch({
            type:CREATE_POST_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }

}

export const getHomePosts =() => async(dispatch, getState)=>{

    
    dispatch({
        type:GET_HOME_POSTS_REQUEST,
        payload:{loading:true}
    })

    const {userLogin: {userInfo}} = getState()

    try{
        const res = await axios.get('/api/post',{headers: {authorization : `Bearer ${userInfo.token}`}})
        
        console.log(res.data.posts)
        dispatch({
            type:GET_HOME_POSTS_SUCCESS,
            payload:res.data.posts
        })

    }catch(error){
        dispatch({
            type:GET_HOME_POSTS_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

export const updatePost = ({content, Images, editstatus}) =>async(dispatch, getState)=>{
    const {userLogin:{userInfo}} = getState()
    dispatch({
        type:UPDATE_POST_REQUEST,
        payload:{loading:true}
    })
    try{
        let imgArr = [];
        const imgNewUrl = Images.filter(img=>!img.data)
        const imgOldUrl = Images.filter(img=>img.data)
        if(imgNewUrl.length>0){
            for(const item of imgNewUrl){
                const bodyFormData = new FormData()
                if(item.camera){
                    bodyFormData.append("image", item.camera)
                }else{
                    bodyFormData.append("image", item)
                }
                const data = await axios.post('/api/postuploads', bodyFormData,{
                    headers:{'Content-Type' : 'multipart/form-data', authorization:`Bearer ${userInfo.token}`}
                })
                imgArr.push(data)
            }
        }
        const res = await axios.patch(`/api/post/${editstatus._id}`, {content, images:[...imgOldUrl,...imgArr]},{
            headers:{authorization:`Bearer ${userInfo.token}`}
        })
        console.log(res)
        dispatch({
            type:UPDATE_POST_SUCCESS,
            payload:res.data.updatedPost
        })

    }catch(error){
        dispatch({
            type:UPDATE_POST_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

export const deletePost = (post) => async (dispatch, getState)=>{
    dispatch({
        type:DELETE_POST_REQUEST,
        payload:{loading:true}
    })
    const {userLogin:{userInfo}} = getState()
    try{
        const res = await axios.delete(`/api/post/${post._id}`, {
            headers:{authorization:`Bearer ${userInfo.token}`}
        })

        console.log(res)
        dispatch({
            type:DELETE_POST_SUCCESS,
            payload:res.data.deletedpost
        })
    }catch(error){
        dispatch({
            type:DELETE_POST_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}