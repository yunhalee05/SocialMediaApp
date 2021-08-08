import axios from "axios"
import { CONVERSATION_DELETE_FAIL, CONVERSATION_DELETE_REQUEST, CONVERSATION_DELETE_SUCCESS, CONVERSATION_GET_FAIL, CONVERSATION_GET_REQUEST, CONVERSATION_GET_SUCCESS, MESSAGE_ADD_FAIL, MESSAGE_ADD_REQUEST, MESSAGE_ADD_SUCCESS, MESSAGE_DELETE_FAIL, MESSAGE_DELETE_REQUEST, MESSAGE_DELETE_SUCCESS, MESSAGE_GET_FAIL, MESSAGE_GET_MORE_FAIL, MESSAGE_GET_MORE_REQUEST, MESSAGE_GET_MORE_SUCCESS, MESSAGE_GET_REQUEST, MESSAGE_GET_SUCCESS } from "../_constants/messageConstants"


export const addMessage = ({msg})=>async(dispatch, getState)=>{

    const {userLogin:{userInfo}}  = getState()
    const {socket} = getState()
    dispatch({
        type:MESSAGE_ADD_REQUEST
    })

    try{
        let imgArr = [];
        if(msg.media.length>0){
            for(const item of msg.media){
                const bodyFormData = new FormData()
                if(item.camera){
                    bodyFormData.append("file", item.camera)
                }else{
                    bodyFormData.append("file", item)
                }
                const data = await axios.post('/api/messageuploads', bodyFormData,{
                    headers:{'Content-Type' : 'multipart/form-data', authorization:`Bearer ${userInfo.token}`}
                })
                imgArr.push(data)
            }
        }

        const res = await axios.post('/api/message', {sender:msg.sender, recipient:msg.recipient, text:msg.text, media:imgArr, call:msg.call}, {
            headers:{authorization:`Bearer ${userInfo.token}`}
        })

        const {_id, avatar, fullname, username} = userInfo.user

        socket.emit('addMessage', {...msg, media:imgArr, user:{_id, avatar, fullname, username}})

        dispatch({
            type:MESSAGE_ADD_SUCCESS,
            payload:{...msg, media:imgArr}
        })
    }catch(error){
        dispatch({
            type:MESSAGE_ADD_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

export const getConversation = ()=>async(dispatch, getState)=>{

    const {userLogin:{userInfo}} = getState()

    dispatch({
        type:CONVERSATION_GET_REQUEST
    })
    try{
        const res = await axios.get('/api/message', {
            headers:{authorization:`Bearer ${userInfo.token}`}
        })

        const newArr=[]

        res.data.conversations.forEach(item=>(
            item.recipients.forEach(receiver=>{
                if(receiver._id!==userInfo.user._id){
                    newArr.push({...receiver, text:item.text, media:item.media, call:item.call})
                }
            })
        ))

        dispatch({
            type:CONVERSATION_GET_SUCCESS,
            payload:newArr
        })

    }catch(error){
        dispatch({
            type:CONVERSATION_GET_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

export const getMessage = ({id})=>async(dispatch, getState)=>{

    const {userLogin:{userInfo}} = getState()

    const page = 1

    dispatch({
        type:MESSAGE_GET_REQUEST
    })

    try{
        const res = await axios.get(`/api/message/${id}`, {
            headers:{authorization:`Bearer ${userInfo.token}`}
        })

        const newData = {...res.data, messages:res.data.messages.reverse()}

        dispatch({
            type:MESSAGE_GET_SUCCESS,
            payload:{
                ...newData,
                _id:id,
                page
            }
        })

    }catch(error){
        dispatch({
            type:MESSAGE_GET_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }    
}

export const loadMoreMessages = ({id, page, limit})=>async(dispatch, getState)=>{

    const {userLogin:{userInfo}} = getState()
    dispatch({
        type:MESSAGE_GET_MORE_REQUEST
    })

    try{
        const res = await axios.get(`/api/message/${id}?page=${page}&limit=${limit}`, {
            headers:{authorization:`Bearer ${userInfo.token}`}
        })

        const newData = {...res.data, messages:res.data.messages.reverse()}

        dispatch({
            type:MESSAGE_GET_MORE_SUCCESS,
            payload:{
                ...newData,
                _id:id,
                page
            }
        })

    }catch(error){
        dispatch({
            type:MESSAGE_GET_MORE_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }   
}

export const deleteMessage = ({msg, data})=>async(dispatch, getState)=>{

    const newMessages = data.filter(item=>item._id !== msg._id)

    const {userLogin: {userInfo}} = getState()
    dispatch({
        type:MESSAGE_DELETE_REQUEST
    })

    try{

        await axios.delete(`/api/message/${msg._id}`, {
            headers:{authorization:`Bearer ${userInfo.token}`}
        })

        dispatch({
            type:MESSAGE_DELETE_SUCCESS,
            payload:{
                newMessages,
                _id:msg.recipient
            }
        })

    }catch(error){
        dispatch({
            type:MESSAGE_DELETE_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }   

}

export const deleteConversation = ({id})=>async(dispatch, getState)=>{

    const {userLogin:{userInfo}} = getState()
    
    dispatch({
        type:CONVERSATION_DELETE_REQUEST
    })

    try{

        await axios.delete(`/api/message/conversation/${id}`,{
            headers:{authorization:`Bearer ${userInfo.token}`}
        })

        dispatch({
            type:CONVERSATION_DELETE_SUCCESS,
            payload:id
        })

    }catch(error){
        dispatch({
            type:CONVERSATION_DELETE_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }   
}