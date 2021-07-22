import axios from "axios"
import { ALERT } from "../_constants/globalConstants"
import { PROFILE_GETPOST_SUCCESS, PROFILE_GETUSER_FAIL, PROFILE_GETUSER_REQUEST, PROFILE_GETUSER_SUCCESS, USER_FOLLOW_PROFILE, USER_UNFOLLOW_PROFILE, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../_constants/profileConstants"
import { USER_LOGIN_SUCCESS } from "../_constants/userConstants"

export const getProfileUser = (userId)=>async (dispatch, getState)=>{
    dispatch({
        type:PROFILE_GETUSER_REQUEST,
        payload:userId
    })
    const {userLogin:{userInfo}} = getState()
    try{
        const {data} = await axios.get(`/api/users/${userId}`,{headers:{authorization : `Bearer ${userInfo?.token}`}
        })

        const res = await axios.get(`/api/post/user/${userId}`,{headers: {authorization : `Bearer ${userInfo.token}`}})


        dispatch({
            type:PROFILE_GETUSER_SUCCESS,
            payload:data
        })

        dispatch({
            type:PROFILE_GETPOST_SUCCESS,
            payload:res.data.posts
        })


    }catch (err){
        dispatch({
            type:PROFILE_GETUSER_FAIL,
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

        const {data} = await axios.put(`/api/users/${userInfo.user._id}`, user, {
            headers: {authorization : `Bearer ${userInfo.token}`}
        })
        dispatch({
            type:USER_UPDATE_PROFILE_SUCCESS,
            payload : data
        })
        // dispatch({
        //     type:USER_LOGIN_SUCCESS,
        //     payload:{
        //         token:userInfo.token,
        //         user:{data}
        //     }
        // })
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })
        localStorage.removeItem('userInfo')
        localStorage.setItem('userInfo',JSON.stringify(data))

    }catch(err){
        dispatch({
            type:USER_UPDATE_PROFILE_FAIL,
            payload:{error:err.response && err.response.data.message? err.response.data.message : err.message}
        })
    }
}

export const followUserProfile = (user)=> async(dispatch, getState)=>{

    const {userLogin: {userInfo}} = getState()
    let newUser =  {...user, followers:[...user.followers, userInfo.user] }

    try{
        
        const {data} = await axios.patch(`/api/users/${user._id}/follow`,userInfo.user,{
            headers:{authorization:`Bearer ${userInfo?.token}`}
        } )

        dispatch({
            type:USER_FOLLOW_PROFILE,
            payload:newUser
        })
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })
        
        localStorage.removeItem('userInfo')
        localStorage.setItem('userInfo',JSON.stringify(data))

    }catch(err){
        dispatch({
            type:ALERT,
            payload:{error:err.response && err.response.data.message? err.response.data.message : err.message}

        })
    }

}

export const unfollowUserProfile = (user)=> async(dispatch, getState)=>{

    const {userLogin: {userInfo}} = getState()
    let newUser =  {...user, followers: user.followers.filter(x=>x._id !==userInfo.user._id) }

    try{
        
        const {data} = await axios.patch(`/api/users/${user._id}/unfollow`,userInfo.user,{
            headers:{authorization:`Bearer ${userInfo?.token}`}
        } )

        dispatch({
            type:USER_UNFOLLOW_PROFILE,
            payload:newUser
        })
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })
        
        dispatch({
            type:USER_UPDATE_PROFILE_SUCCESS,
            payload : data
        })

        localStorage.removeItem('userInfo')
        localStorage.setItem('userInfo',JSON.stringify(data))

    }catch(err){
        dispatch({
            type:ALERT,
            payload:{error:err.response && err.response.data.message? err.response.data.message : err.message}

        })
    }
}