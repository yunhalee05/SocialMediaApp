import axios from "axios"
import { PROFILE_GETUSER_FAIL, PROFILE_GETUSER_REQUEST, PROFILE_GETUSER_SUCCESS } from "../_constants/profileConstants"

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