import axios from "axios"
import { CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, DELETE_POST_FAIL, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, GET_DISCOVER_POST_FAIL, GET_DISCOVER_POST_REQUEST, GET_DISCOVER_POST_SUCCESS, GET_HOME_POSTS_FAIL, GET_HOME_POSTS_REQUEST, GET_HOME_POSTS_SUCCESS, GET_POST_FAIL, GET_POST_REQUEST, GET_POST_SUCCESS, GET_PROFILE_POSTS_FAIL, GET_PROFILE_POSTS_REQUEST, GET_PROFILE_POSTS_SUCCESS, GET_SAVE_POST_FAIL, GET_SAVE_POST_REQUEST, GET_SAVE_POST_SUCCESS, LIKE_POST_FAIL, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, SET_SAVE_POST_FAIL, SET_SAVE_POST_REQUEST, SET_SAVE_POST_SUCCESS, SET_UNSAVE_POST_FAIL, SET_UNSAVE_POST_REQUEST, SET_UNSAVE_POST_SUCCESS, UNLIKE_POST_FAIL, UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UPDATE_POST_FAIL, UPDATE_POST_REQUEST, UPDATE_POST_SUCCESS } from "../_constants/postConstants"
import { USER_LOGIN_SUCCESS } from "../_constants/userConstants"
import { createNotify, removeNotify } from "./NotifyActions"

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


        // // Notify
        const msg={
            id:res.data.newPost._id,
            text:'added a new post.',
            recipients:res.data.newPost.user.followers,
            url:`/post/${res.data.newPost._id}`,
            content,
            image: imgArr[0].data
        }

        dispatch(createNotify({msg}))

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
    const {getposts:{posts}} = getState()
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

export const deletePost = ({post}) => async (dispatch, getState)=>{
    dispatch({
        type:DELETE_POST_REQUEST,
        payload:{loading:true}
    })
    const {userLogin:{userInfo}} = getState()

    try{
        const res = await axios.delete(`/api/post/${post._id}`, {
            headers:{authorization:`Bearer ${userInfo.token}`}
        })

        dispatch({
            type:DELETE_POST_SUCCESS,
            payload:post._id
        })

        // console.log(res)

        const msg={
            id:post._id,
            text:'deleted a post.',
            recipients:res.data.deletedpost.user.followers,
            url:`/post/${post._id}`,
            // content:res.data.deletedpost.content,
            // image: res.data.deletedpost.images[0].data
        }

        dispatch(removeNotify({msg}))
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

export const likePost = (post, socket) => async (dispatch, getState)=>{

    dispatch({
        type:LIKE_POST_REQUEST,
        payload:{loading:true}
    })
    const {userLogin:{userInfo}} = getState()


    try{
        const res = await axios.patch(`/api/post/${post._id}/like`,null, {
            headers:{authorization:`Bearer ${userInfo.token}`}
        })
        
        socket.emit('likePost', res.data.likedpost)

        dispatch({
            type:LIKE_POST_SUCCESS,
            payload:res.data.likedpost
        })

    }catch(error){
        dispatch({
            type:LIKE_POST_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

export const unlikePost = (post, socket) => async (dispatch, getState)=>{

    dispatch({
        type:UNLIKE_POST_REQUEST,
        payload:{loading:true}
    })

    const {userLogin:{userInfo}} = getState()

    try{
        const res = await axios.patch(`/api/post/${post._id}/unlike`,null, {
            headers:{authorization:`Bearer ${userInfo.token}`}
        })

        socket.emit('unlikePost', res.data.unlikedpost)

        dispatch({
            type:UNLIKE_POST_SUCCESS,
            payload:res.data.unlikedpost
        })

    }catch(error){
        dispatch({
            type:UNLIKE_POST_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}



export const getPostDetail =(postId) => async(dispatch, getState)=>{

    
    dispatch({
        type:GET_POST_REQUEST,
        payload:{loading:true}
    })

    const {userLogin: {userInfo}} = getState()

    try{
        const res = await axios.get(`/api/post/${postId}`,{headers: {authorization : `Bearer ${userInfo.token}`}})
        
        
        dispatch({
            type:GET_POST_SUCCESS,
            payload:res.data.post
        })

    }catch(error){
        dispatch({
            type:GET_POST_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

export const getDiscoverPost= ()=>async(dispatch, getState)=>{
    dispatch({
        type:GET_DISCOVER_POST_REQUEST,
        payload:{loading:true}
    })

    const {userLogin: {userInfo}} = getState();
    try{
       const res = await axios.get('/api/discover',{
            headers:{authorization:`Bearer ${userInfo.token}`},
        })


        dispatch({
            type:GET_DISCOVER_POST_SUCCESS,
            payload:{posts:res.data.posts, result:res.data.result}
        })

    }catch(error){
        dispatch({
            type:GET_DISCOVER_POST_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

export const setSavePost=(post) =>async(dispatch, getState)=>{
    dispatch({
        type:SET_SAVE_POST_REQUEST,
        payload:{loading:true}
    })

    const {userLogin:{userInfo}} = getState();

    try{
        const res = await axios.patch(`/api/post/save/${post._id}`,null, {
            headers:{authorization:`Bearer ${userInfo.token}`}
        })

        dispatch({
            type:SET_SAVE_POST_SUCCESS,
            payload:res.data.save
        })

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:{user:res.data.save, token:userInfo.token}
        })

        localStorage.removeItem('userInfo')
        localStorage.setItem('userInfo',JSON.stringify({user:res.data.save, token:userInfo.token}))
        
    }catch(error){
        dispatch({
            type:SET_SAVE_POST_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}



export const setUnsavePost=(post) =>async(dispatch, getState)=>{
    dispatch({
        type:SET_UNSAVE_POST_REQUEST,
        payload:{loading:true}
    })

    const {userLogin:{userInfo}} = getState();

    try{
        const res = await axios.patch(`/api/post/unsave/${post._id}`,null, {
            headers:{authorization:`Bearer ${userInfo.token}`}
        })

        dispatch({
            type:SET_UNSAVE_POST_SUCCESS,
            payload:res.data.unsave
        })

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:{user:res.data.unsave, token:userInfo.token}
        })
        localStorage.removeItem('userInfo')
        localStorage.setItem('userInfo',JSON.stringify({user:res.data.unsave, token:userInfo.token}))
        
        
    }catch(error){
        dispatch({
            type:SET_UNSAVE_POST_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}


