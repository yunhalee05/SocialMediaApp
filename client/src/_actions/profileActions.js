import axios from "axios"
import { ALERT } from "../_constants/globalConstants"
import { GET_USER_PROFILE_REQUEST, PROFILE_GETPOST_SUCCESS, PROFILE_GETUSER_FAIL, PROFILE_GETUSER_REQUEST, PROFILE_GETUSER_SUCCESS, PROFILE_GET_FAIL, PROFILE_GET_REQUEST, USER_FOLLOW_PROFILE, USER_UNFOLLOW_PROFILE, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../_constants/profileConstants"
import { USER_LOGIN_SUCCESS } from "../_constants/userConstants"

export const getProfileUser = (userId)=>async (dispatch, getState)=>{
    dispatch({
        type:PROFILE_GET_REQUEST
    })
    const {userLogin:{userInfo}} = getState()
    try{
        const resUser = await axios.get(`/api/users/${userId}`,{headers:{authorization : `Bearer ${userInfo?.token}`}
        })

        const resPost = await axios.get(`/api/post/user/${userId}`,{headers: {authorization : `Bearer ${userInfo.token}`}})


        dispatch({
            type:PROFILE_GETUSER_SUCCESS,
            payload:resUser.data.user
        })

        dispatch({
            type:PROFILE_GETPOST_SUCCESS,
            payload:resPost.data.posts
        })


    }catch (err){
        dispatch({
            type:PROFILE_GET_FAIL,
            payload:{error:err.response && err.response.data.message? err.response.data.message : err.message}
        })
    }
}

export const updateUserProfile = (user ) =>async (dispatch, getState)=>{
    dispatch({
        type:USER_UPDATE_PROFILE_REQUEST,
        payload:{user}
    })
    const {userLogin: {userInfo}} = getState()
    try{

        const res = await axios.put(`/api/users/${userInfo.user._id}`, user, {
            headers: {authorization : `Bearer ${userInfo.token}`}
        })
        dispatch({
            type:USER_UPDATE_PROFILE_SUCCESS,
            payload : res.data.user
        })

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:{
                token:userInfo.token,
                user:res.data.user
            }
        })

        // localStorage.removeItem('userInfo')
        localStorage.setItem('userInfo',JSON.stringify({token:userInfo.token, user:res.data.user}))

    }catch(err){
        dispatch({
            type:USER_UPDATE_PROFILE_FAIL,
            payload:{error:err.response && err.response.data.message? err.response.data.message : err.message}
        })
    }
}

export const followUserProfile = (user,socket)=> async(dispatch, getState)=>{

    const {userLogin: {userInfo}} = getState()
    // let newUser =  {...user, followers:[...user.followers, userInfo.user] }

    try{
        
        const res = await axios.patch(`/api/users/${user._id}/follow`,userInfo.user,{
            headers:{authorization:`Bearer ${userInfo?.token}`}
        } )

        socket.emit('follow', res.data.followedUser)


        dispatch({
            type:USER_FOLLOW_PROFILE,
            payload:res.data.newUser
        })
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:{
                token:userInfo.token,
                user:res.data.newUser
            }
        })
        
        localStorage.setItem('userInfo',JSON.stringify({token:userInfo.token, user:res.data.newUser}))

    }catch(err){
        dispatch({
            type:ALERT,
            payload:{error:err.response && err.response.data.message? err.response.data.message : err.message}

        })
    }

}

export const unfollowUserProfile = (user,socket)=> async(dispatch, getState)=>{

    const {userLogin: {userInfo}} = getState()
    // let newUser =  {...user, followers: user.followers.filter(x=>x._id !==userInfo.user._id) }


    try{
        
        const res = await axios.patch(`/api/users/${user._id}/unfollow`,userInfo.user,{
            headers:{authorization:`Bearer ${userInfo?.token}`}
        } )

        socket.emit('unfollow', res.data.unfollowedUser)


        dispatch({
            type:USER_FOLLOW_PROFILE,
            payload:res.data.newUser
        })
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:{
                token:userInfo.token,
                user:res.data.newUser
            }
        })

        localStorage.setItem('userInfo',JSON.stringify({token:userInfo.token, user:res.data.newUser}))

    }catch(err){
        dispatch({
            type:ALERT,
            payload:{error:err.response && err.response.data.message? err.response.data.message : err.message}

        })
    }
}