import axios from "axios"
import { CREATE_NOTIFY_FAIL, CREATE_NOTIFY_REQUEST, DELETE_ALL_NOTIFY_FAIL, DELETE_ALL_NOTIFY_REQUEST, DELETE_ALL_NOTIFY_SUCCESS, GET_NOTIFY_FAIL, GET_NOTIFY_REQUEST, GET_NOTIFY_SUCCESS, READ_NOTIFY_FAIL, READ_NOTIFY_REQUEST, READ_NOTIFY_SUCCESS, REMOVE_NOTIFY_FAIL, REMOVE_NOTIFY_REQUEST } from "../_constants/notifyConstants"

export const createNotify = ({msg})=> async(dispatch, getState)=>{
    
    const {userLogin:{userInfo}} = getState()
    const {socket} = getState()

    dispatch({
        type:CREATE_NOTIFY_REQUEST
    })
    
    try{
        const res = await axios.post('/api/notify', {body:msg},{
            headers:{authorization:`Bearer ${userInfo.token}`}
        })

        socket.emit('createNotify', res.data.newnotify)

    }catch(error){
        dispatch({
            type:CREATE_NOTIFY_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}


export const removeNotify = ({msg})=> async(dispatch, getState)=>{

    const {userLogin:{userInfo}} = getState()
    const {socket} = getState()


    dispatch({
        type:REMOVE_NOTIFY_REQUEST
    })
    try{
        const res = await axios.delete(`/api/notify/${msg.id}?url=${msg.url}`,{
            headers:{authorization:`Bearer ${userInfo.token}`}
        })

        // console.log(res)
        // dispatch({
        //     type:REMOVE_NOTIFY_SUCCESS,
        //     payload:msg
        // })
        socket.emit('removeNotify', msg)


    }catch(error){
        dispatch({
            type:REMOVE_NOTIFY_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

export const getNotify = ()=> async(dispatch, getState)=>{

    const {userLogin:{userInfo}} = getState()

    dispatch({
        type:GET_NOTIFY_REQUEST
    })

    try{
        const res = await axios.get('/api/notify', {
            headers:{authorization:`Bearer ${userInfo.token}`}
        })

        dispatch({
            type:GET_NOTIFY_SUCCESS,
            payload:res.data.notifies
        })

    }catch(error){
        dispatch({
            type:GET_NOTIFY_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}


export const readNotify = ({msg})=> async(dispatch, getState)=>{

    const {userLogin:{userInfo}} = getState()

    dispatch({
        type:READ_NOTIFY_REQUEST
    })

    try{
        const res = await axios.patch(`/api/notify/isReadNotify/${msg._id}`,null, {
            headers:{authorization:`Bearer ${userInfo.token}`}
        })

        dispatch({
            type:READ_NOTIFY_SUCCESS,
            payload:res.data.updatedNotify
        })

    }catch(error){
        dispatch({
            type:READ_NOTIFY_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }}

    export const deleteAllNotifies = ()=> async(dispatch, getState)=>{
        const {userLogin:{userInfo}} = getState()

        dispatch({
            type:DELETE_ALL_NOTIFY_REQUEST
        })

        try{
            await axios.delete('/api/notify/', {
                headers:{authorization:`Bearer ${userInfo.token}`}
            })
            dispatch({
                type:DELETE_ALL_NOTIFY_SUCCESS,
                payload:[]
            })
        }catch(error){
            dispatch({
                type:DELETE_ALL_NOTIFY_FAIL,
                payload:                
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            })
        }}


