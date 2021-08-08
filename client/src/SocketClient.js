import io from 'socket.io-client'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ALERT, SOCKET } from './_constants/globalConstants'
import { LIKE_POST_SUCCESS, UNLIKE_POST_SUCCESS, UPDATE_POST_SUCCESS } from './_constants/postConstants'
import { USER_LOGIN_SUCCESS } from './_constants/userConstants'
import { PROFILE_GETUSER_SUCCESS, USER_FOLLOW_PROFILE, USER_UNFOLLOW_PROFILE, USER_UPDATE_PROFILE_SUCCESS } from './_constants/profileConstants'
import { CREATE_NOTIFY_SUCCESS, REMOVE_NOTIFY_SUCCESS } from './_constants/notifyConstants'
import { MESSAGE_ADD_SUCCESS, MESSAGE_ADD_USER } from './_constants/messageConstants'
import { CHECK_ONLINE_SUCCESS, OFFLINE, ONLINE } from './_constants/onlineCheckConstants'
import { CALL } from './_constants/callConstants'


function SocketClient() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    
    const online = useSelector(state => state.online)

    const call = useSelector(state => state.call)

    const socket = useSelector(state => state.socket)

    const dispatch = useDispatch()

    // const socket = io();

    // useEffect(() => {
    //     dispatch({
    //       type:SOCKET,
    //       payload:socket
    //     })
    //     return ()=>socket.close()
    //   }, [dispatch])
    
    //JoinUser
    useEffect(() => {
        socket.emit('joinUser', userInfo.user)
      }, [socket, userInfo.user])
    
    //likes
    useEffect(() => {
        socket.on('likeToClient', likedpost=>{
            dispatch({
                type:LIKE_POST_SUCCESS,
                payload:likedpost
            })
        })
        return () =>socket.off('likeToClient')
      }, [socket, dispatch])

    useEffect(() => {
        socket.on('unlikeToClient', unlikedpost=>{
            // console.log(unlikedpost)
            dispatch({
                type:UNLIKE_POST_SUCCESS,
                payload:unlikedpost
            })
        })
        return () =>socket.off('likeToClient')
        }, [socket,dispatch])
    


    //Comments
    useEffect(() => {
        socket.on('createCommentToClient', newpost=>{
            dispatch({
                type:UPDATE_POST_SUCCESS,
                payload:newpost
            })
        })
        return socket.off('createCommentToClient')
    }, [socket,dispatch])
    
    useEffect(() => {
        socket.on('deleteCommentToClient', newpost=>{
            dispatch({
                type:UPDATE_POST_SUCCESS,
                payload:newpost
            })
        })
        return () =>socket.off('deleteCommentToClient')
    }, [socket,dispatch])
    
    // Follow

    useEffect(() => {
        socket.on('followToClient', data =>{
            dispatch({
                type:USER_LOGIN_SUCCESS,
                payload:{
                    user:data,
                    token:userInfo.token
                }
            })

            localStorage.setItem('userInfo',JSON.stringify({token:userInfo.token, user:data}))

        })
        return () => socket.off('followToClient')
    }, [socket, dispatch, userInfo])

    useEffect(() => {
        socket.on('unfollowToClient', data =>{

            dispatch({
                type:USER_LOGIN_SUCCESS,
                payload:{
                    user:data,
                    token:userInfo.token
                }
            })

            localStorage.setItem('userInfo',JSON.stringify({token:userInfo.token, user:data}))

        })
        return () =>socket.off('unfollowToClient')
    }, [socket, dispatch, userInfo])

    //Notification
    useEffect(() => {
        socket.on('createNotifyToClient', msg=>{
            dispatch({
                type:CREATE_NOTIFY_SUCCESS,
                payload:msg
            })
        })
        return () => socket.off('removeNotifyToClient')
    }, [socket, dispatch])

    useEffect(() => {
        socket.on('removeNotifyToClient', msg=>{
            dispatch({
                type:REMOVE_NOTIFY_SUCCESS,
                payload:msg
            })
        })
        return () => socket.off('removeNotifyToClient')
    }, [socket, dispatch])


    //Message
    useEffect(() => {
        socket.on('addMessageToClient', msg=>{
            dispatch({
                type:MESSAGE_ADD_SUCCESS,
                payload:msg
            })

            dispatch({
                type:MESSAGE_ADD_USER,
                payload:{
                    ...msg.user,
                    text:msg.text,
                    media:msg.media
                }
            })
        })
        return () => socket.off('addMessageToClient')
    }, [socket, dispatch])

    //Check User Online
    useEffect(() => {
        socket.emit('checkUserOnline', userInfo.user)
    }, [socket, userInfo.user])

    useEffect(() => {
        socket.on('checkUserOnlineToMe', data=>{
            data.forEach(item=>{
                if(!online.includes(item.id)){
                    dispatch({
                        type:ONLINE,
                        payload:item.id
                    })
                }
            })
        })
        return () => socket.off('checkUserOnlineToMe')
    }, [socket, dispatch, online])
    

    useEffect(() => {
        socket.on('checkUserOnlineToClient', data=>{
            if(!online.includes(data)){
                dispatch({
                    type:ONLINE,
                    payload:data
                })
            }
            
        })
        return () => socket.off('checkUserOnlineToClient')
    }, [socket, dispatch, online])
    

    //check user off line
    useEffect(() => {
        socket.on('checkUserOffline', id=>{
            if(online.includes(id)){
                dispatch({
                    type:OFFLINE,
                    payload:id
                })
            }
        })

        return () => socket.off('checkUserOffline')

    }, [socket, dispatch, online])

    //Call User
    useEffect(() => {
        socket.on('callUserToClient', data=>{
            dispatch({
                type:CALL,
                payload:data
            })
        })

        return () => socket.off('callUserToClient')

    }, [socket, dispatch])

    useEffect(() => {
        socket.on('endCallToClient', data=>{

            dispatch({
                type:CALL,
                payload:null
            })
        })

        return () =>socket.off('endCallToClient')
    }, [socket, dispatch])

    useEffect(() => {
        socket.on('userBusy', data=>{
            dispatch({
                type:ALERT,
                payload:{error:`${call.username} is busy.`}
            })
        })
        return () =>socket.off('userBusy')

    }, [socket, dispatch, call])
    



    return <> </>

}

export default SocketClient
