import io from 'socket.io-client'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SOCKET } from './_constants/globalConstants'
import { LIKE_POST_SUCCESS, UNLIKE_POST_SUCCESS, UPDATE_POST_SUCCESS } from './_constants/postConstants'
import { USER_LOGIN_SUCCESS } from './_constants/userConstants'
import { USER_FOLLOW_PROFILE, USER_UNFOLLOW_PROFILE, USER_UPDATE_PROFILE_SUCCESS } from './_constants/profileConstants'
import { CREATE_NOTIFY_SUCCESS, REMOVE_NOTIFY_SUCCESS } from './_constants/notifyConstants'


function SocketClient() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()

    const socket = io();

    useEffect(() => {
        dispatch({
          type:SOCKET,
          payload:socket
        })
        return ()=>socket.close()
      }, [dispatch, socket])
    
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
            console.log(unlikedpost)
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
                payload:data
            })
            dispatch({
                type:USER_FOLLOW_PROFILE,
                payload:data.user
            })
            dispatch({
                type:USER_UPDATE_PROFILE_SUCCESS,
                payload:data
            })
        })
        return () => socket.off('followToClient')
    }, [socket, dispatch, userInfo])

    useEffect(() => {
        socket.on('unfollowToClient', data =>{

            dispatch({
                type:USER_LOGIN_SUCCESS,
                payload:data
            })
            dispatch({
                type:USER_UNFOLLOW_PROFILE,
                payload:data.user
            })
            dispatch({
                type:USER_UPDATE_PROFILE_SUCCESS,
                payload:data
            })
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

    return <> </>

}

export default SocketClient
