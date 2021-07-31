import axios from "axios"
import { GET_USER_SUGGESTION_FAIL, GET_USER_SUGGESTION_REQUEST, GET_USER_SUGGESTION_SUCCESS } from "../_constants/userConstants"

export const getSuggestions = ()=>async (dispatch, getState)=>{
    dispatch({
        type:GET_USER_SUGGESTION_REQUEST,
        payload:{loading:true}
    })
    const {userLogin:{userInfo}} = getState()
    try{
        const res = await axios.get(`/api/users/suggestion/${userInfo.user._id}`,{headers:{authorization : `Bearer ${userInfo?.token}`}
        })


        dispatch({
            type:GET_USER_SUGGESTION_SUCCESS,
            payload:res.data
        })

    }catch (err){
        dispatch({
            type:GET_USER_SUGGESTION_FAIL,
            payload:{error:err.response && err.response.data.message? err.response.data.message : err.message}
        })
    }
}