import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../../_actions/messageActions'
import { CALL } from '../../_constants/callConstants'
import { ALERT } from '../../_constants/globalConstants'
import Avatar from '../Avatar'
import ring from '../../audio/ring.mp3'

function CallModal() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const call = useSelector(state => state.call)
    const peer = useSelector(state => state.peer)
    const socket = useSelector(state => state.socket)
    
    const [hours, setHours] = useState(0)
    const [mins, setMins] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [total, setTotal] = useState(0)
    
    const [answer, setAnswer] = useState(false)

    const [tracks, setTracks] = useState(null)
    const [newCall, setNewCall] = useState(null)

    const callerVideo = useRef()
    const receiverVideo = useRef()
    
    const dispatch = useDispatch()

    useEffect(() => {
        const setTime=() =>{
            setTotal(t=>t+1)
            setTimeout(setTime, 1000)
        }
        setTime()
        return () => setTotal(0)
    }, [])

    useEffect(() => {
        setSeconds(total%60)
        setMins(parseInt(total/60))
        setHours(parseInt(total/3600))
    }, [total])

    const addCallMessage =useCallback((call, times)=>{
        if(call.recipient !== userInfo.user._id){

            const msg = {
                sender: call.sender,
                recipient:call.recipient,
                text:'',
                media:[],
                call:{video:call.video, times},
                createdAt:new Date().toISOString()
            }
            dispatch(addMessage({msg}))
        }
    },[userInfo, dispatch])
    

    const handleEndCall= () =>{
        tracks && tracks.forEach(track=>track.stop())
        
        if(newCall) newCall.close()
        let times = answer? total: 0
        socket.emit('endCall', {...call, times})
        addCallMessage(call, times)
        dispatch({
            type:CALL,
            payload:null
        })
    }

    useEffect(() => {
        if(answer){
            setTotal(0)
        }else{
            const timer = setTimeout(()=>{
                tracks && tracks.forEach(track=>track.stop())
                socket.emit('endCall', {...call, times:0})
                addCallMessage(call, 0)
                dispatch({
                    type:CALL,
                    payload:null
                })
            },15000)
            return () => clearTimeout(timer)
        }
    }, [answer, call, socket, dispatch, tracks, addCallMessage])


    useEffect(() => {
        socket.on('endCallToClient', data =>{
            tracks && tracks.forEach(track=>track.stop())
            if(newCall) newCall.close()
            addCallMessage(data, data.times)
            dispatch({
                type:CALL,
                payload:null
            })
        })
        return () => socket.off('endCallToClient')
    }, [socket, dispatch, tracks, newCall, addCallMessage])



    const openStream = async(video)=>{
        let stream = null;
        const config = {audio:true, video}
        stream = await navigator.mediaDevices.getUserMedia(config)
 
        return stream
    }

    const playStream = (tag, stream)=>{
        let video = tag;
        video.srcObject = stream;
        video.play()
    }

    const handleAnswer=() =>{
        openStream(call.video).then(stream=>{
            // callerVideo.current.srcObject = stream
            // callerVideo.current.play()

            playStream(callerVideo.current, stream)
            const track = stream.getTracks()
            setTracks(track)
            const newCall = peer.call(call.peerId, stream);
            newCall.on('stream', function(remoteStream) {
                // receiverVideo.current.srcObject = remoteStream
                // receiverVideo.current.play()
                playStream(receiverVideo.current, remoteStream)
            });
            setAnswer(true)
            setNewCall(newCall)
        })

    }

    useEffect(() => {
        peer.on('call', newCall=>{
            openStream(call.video).then(stream=>{
                if(callerVideo.current){
                    playStream(callerVideo.current, stream)
                }
                const track = stream.getTracks()
                setTracks(track)
                newCall.answer(stream)
                newCall.on('stream', function(remoteStream) {
                    // Show stream in some video/canvas element.
                    if(receiverVideo.current){
                        playStream(receiverVideo.current, remoteStream)
                    }
                });

                setAnswer(true)
                setNewCall(newCall)
            })
        })

        return () => peer.removeListener('call')
    }, [peer, call.video])



    useEffect(() => {
        socket.on('callerDisconnect',() =>{
            tracks && tracks.forEach(track=>track.stop())
            let times = answer ? total : 0
            addCallMessage(call, times)
            dispatch({
                type:CALL,
                payload:null
            })
            dispatch({
                type:ALERT,
                payload:{error:'The user disconnected this line.'}
            })
        })
        return () =>socket.off('callerDisconnect')

    }, [socket, dispatch, tracks, call, addCallMessage, answer, total])
    

    // const playAudio = (newAudio)=>{
    //     newAudio.play()
    // }

    // const pauseAudio = (newAudio)=>{
    //     newAudio.pause()
    //     newAudio.currentTime = 0
    // }

    // useEffect(() => {
    //     let newAudio = new Audio(ring)
    //     if(answer || call===[]){
    //         pauseAudio(newAudio)
    //     }else{
    //         playAudio(newAudio)
    //     }
    // }, [])

    return (
        <div className="call_modal">
            <div className="call_box" style={{display: (answer && call.video)? 'none':'flex'}}>
                <div className="text-center" style={{padding:'40px 0'}}>
                    <Avatar src={call.avatar} size="supper-avatar"/>
                    <h4>{call.username}</h4>
                    <h6>{call.fullname}</h6>
                    {
                        answer
                        ? <div className="timer mt-2">
                            <span>{hours.toString().length<2 ? '0'+ hours : hours }</span>
                            <span>:</span>
                            <span>{mins.toString().length<2 ? '0'+ mins : mins }</span>
                            <span>:</span>
                            <span>{seconds.toString().length<2 ? '0' + seconds : seconds}</span>
                        </div>
                        :   <div>
                            {
                                call.video
                                ? <span>calling video...</span>
                                : <span>calling audio...</span>
                            }
                            </div>
                    }
                </div>

                    {
                        !answer &&
                        <div className="timer">
                            <small>{mins.toString().length<2 ? '0'+ mins : mins }</small>
                            <small>:</small>
                            <small>{seconds.toString().length<2 ? '0' + seconds : seconds}</small>
                        </div>
                    }

                <div className="call_menu">
                    <button className="material-icons text-danger" onClick={handleEndCall}>
                        call_end
                    </button>
                    
                    {
                        (call.recipient ===userInfo.user._id && !answer) && 
                            <>
                            {
                                call.video
                                ? <button className="material-icons text-success" onClick={handleAnswer}>videocam</button>
                                : <button className="material-icons text-success" onClick={handleAnswer}>call</button>
                            }
                            </>
                    }
                </div>

                

            </div>

            <div className="show_video" style={{opacity: answer && call.video? '1': '0'}}>
                    <video ref={callerVideo} className="caller_video"></video>
                    <video ref={receiverVideo} className="receiver_video"></video>
                    <div className="timer">
                        <span>{hours.toString().length<2 ? '0'+ hours : hours }</span>
                        <span>:</span>
                        <span>{mins.toString().length<2 ? '0'+ mins : mins }</span>
                        <span>:</span>
                        <span>{seconds.toString().length<2 ? '0' + seconds : seconds}</span>
                    </div>
                    <button className="material-icons text-danger end_call" onClick={handleEndCall}>
                        call_end
                    </button>

                </div>
        </div>
    )
}

export default CallModal
