import axios from "axios"
import { ALERT } from "../_constants/globalConstants"

export const createNotify = ({msg, socket})=> async(dispatch, getState)=>{
    
    const {userLogin:{userInfo}} = getState()
    
    try{
        const res = await axios.post('/api/notify', {body:msg},{
            headers:{authorization:`Bearer ${userInfo.token}`}
        })

        console.log(res)
        

    }catch(error){
        dispatch({
            type:ALERT,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}


export const removeNotify = ({msg, socket})=> async(dispatch, getState)=>{

    const {userLogin:{userInfo}} = getState()
    try{
        const res = await axios.delete(`/api/notify/${msg.id}?url=${msg.url}`,{
            headers:{authorization:`Bearer ${userInfo.token}`}
        })

        console.log(res)

    }catch(error){
        dispatch({
            type:ALERT,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}
