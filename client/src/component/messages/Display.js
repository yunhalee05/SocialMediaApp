import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMessage } from '../../_actions/messageActions'
import Avatar from '../Avatar'
import Times from '../Times'

function Display({user, msg, data}) {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()

    const imageShow=(src) =>{
        return (
            <img src={src} alt="images" className="img-thumbnail" />
        )
    }

    const videoShow=(src) =>{
        return (
            <video src={src} alt="images" className="img-thumbnail" />
        )
    }
    const handleDeleteMessage=()=>{
        if(!data) return ;
        if(window.confirm('Do you want to delete this message?')){
            dispatch(deleteMessage({msg, data}))
        }
    }
    return (
       <>
       <div className="chat_title">
            <Avatar src={user.avatar} size="small-avatar"/>
            <span>{user.username}</span>
       </div>

        <div className="you_content">
            {
                user._id === userInfo.user._id &&
                <i className="fas fa-trash text-danger" onClick={handleDeleteMessage}></i>

            }
            
            <div>
                {
                    msg.call &&
                    <button className="btn d-flex align-items-center py-3" style={{background:'#eee', borderRadius:'10px'}}>
                        <span className="material-icons font-weight-bold mr-1" style={{fontSize:'2.5rem', color: msg.call.times ===0? 'crimson':'green'}}>
                            {
                                msg.call.times ===0
                                ? msg.call.video 
                                    ? 'videocam_off'
                                    : 'phone_disabled'
                                :msg.call.video 
                                    ? 'video_camera_front'
                                    : 'call'
                            }
                        </span>

                        <div className="text-left">
                            <h6>{msg.call.video ? 'Video Call' : 'Audio Call'}</h6>
                            <small>
                                {
                                    msg.call.times >0 
                                    ? <Times total = {msg.call.times}/>
                                    : new Date(msg.call.times).toLocaleTimeString()
                                }
                            </small>
                        </div>
                    </button>
                }

                {
                    msg.text && 
                    <div className="chat_text">
                        {msg.text}
                    </div>

                }

                {
                    msg.media && 
                    msg.media.map((item, index)=>(
                        <div key={index}>
                            {
                                item.data.match(/video/i)||item.data.match(/mp4/i)||item.data.match(/avi/i)||item.data.match(/mov/i)||item.data.match(/wmv/i)
                                ? videoShow(item.data)
                                : imageShow(item.data)
                            }
                        </div>
                    ))
                }
            </div>
        </div>

       <div className="chat_time">
           {new Date(msg.createdAt).toLocaleString()}
       </div>
       </>
    )
}

export default Display
