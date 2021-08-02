import io from 'socket.io-client'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SOCKET } from './_constants/globalConstants'
import { UPDATE_POST_SUCCESS } from './_constants/postConstants'
import { USER_LOGIN_SUCCESS } from './_constants/userConstants'
import { USER_FOLLOW_PROFILE, USER_UNFOLLOW_PROFILE, USER_UPDATE_PROFILE_SUCCESS } from './_constants/profileConstants'


function SocketClient() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    // const socket = useSelector(state => state.socket)
    const dispatch = useDispatch()

    const socket = io();

    useEffect(() => {
        dispatch({
            type:SOCKET,
            payload:socket
        })

        return () =>socket.close()
    }, [socket, dispatch])

    //JoinUser
    useEffect(() => {
        socket.emit('joinUser', userInfo.user._id)
      }, [socket, userInfo.user])
    
    //likes
    useEffect(() => {
        socket.on('likeToClient', likedpost=>{
            dispatch({
                type:UPDATE_POST_SUCCESS,
                payload:likedpost
            })
        })

        return () =>socket.off('likeToClient')
      }, [socket, dispatch])

    useEffect(() => {
        socket.on('unlikeToClient', unlikedpost=>{
            console.log(unlikedpost)
            dispatch({
                type:UPDATE_POST_SUCCESS,
                payload:unlikedpost
            })
        })
        }, [socket,dispatch])
    


    //Comments
    useEffect(() => {
        socket.on('createCommentToClient', newpost=>{
            console.log(newpost)
            dispatch({
                type:UPDATE_POST_SUCCESS,
                payload:newpost
            })
        })
        }, [socket,dispatch])
    
    useEffect(() => {
        socket.on('deleteCommentToClient', newpost=>{
            console.log(newpost)
            dispatch({
                type:UPDATE_POST_SUCCESS,
                payload:newpost
            })
        })
        }, [socket,dispatch])
    
    // Follow

    useEffect(() => {
        socket.on('followToClient', data =>{
            console.log(data)
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
        
    }, [socket, dispatch, userInfo])

    useEffect(() => {
        socket.on('unfollowToClient', data =>{
            console.log(data)

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
    }, [socket, dispatch, userInfo])


    return <> </>

}

export default SocketClient
