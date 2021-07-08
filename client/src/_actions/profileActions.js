import axios from "axios"
import { PROFILE_GETUSER_FAIL, PROFILE_GETUSER_REQUEST, PROFILE_GETUSER_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../_constants/profileConstants"
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

        dispatch({
            type:PROFILE_GETUSER_SUCCESS,
            payload:data
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