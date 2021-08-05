import  Avatar from '../component/Avatar'
import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import NoNotice from '../images/no-alarm.png'
import { BASE_URL } from '../utils'
import { deleteAllNotifies, readNotify } from '../_actions/NotifyActions'

function NotifyModal() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const notify = useSelector(state => state.notify)

    const dispatch = useDispatch()

    const handleIsRead =(msg)=>{
        dispatch(readNotify({msg}))
    }

    const handleDeleteAll=() =>{
        const newArr = notify.notify.filter(item=> item.isRead===false)

        if(newArr.length===0) return dispatch(deleteAllNotifies())

        if(window.confirm(`You have ${newArr.length} unread notices. Are you sure to delete?`))
             return dispatch(deleteAllNotifies())
        
    }


    return (
        <div style={{minWidth:'300px'}}>
            <div className="d-flex justify-content-between align-items-center px-3">
                <h3>Notification</h3>
                {
                    notify.sound
                    ? <i className="fas fa-bell text-danger"
                    style={{fontSize: '1.2rem', cursor:'pointer'}}
                    ></i>
                    : <i className="fas fa-bell-slash text-danger"
                    style={{fontSize: '1.2rem', cursor:'pointer'}}
                    ></i>
                }
            </div>
            <hr className="mt-0" />
            {
                notify.notify.length ===0 &&
                <img src={NoNotice} alt="NoNotice" className="w-50"/>
            }

            <div style={{maxHeight:'calc(100vh-200px)', overflow:'auto'}}>
                {
                    notify.notify && notify.notify.map((msg, index)=>(
                        <div className="px-2 mb-3" key={index}>
                            <Link to={`${msg.url}`} className="d-flex text-dark align-items-center" onClick={()=>handleIsRead(msg)}>
                                <Avatar src={msg.user.avatar} size="big-avatar"/>
                                <div className="mx-1 flex-fill">
                                    <div>
                                        <strong className="mr-1">{msg.user.username}</strong>
                                        <span>{msg.text}</span>
                                    </div>
                                    {msg.content && <small>{msg.content.slice(0,20)}...</small>}
                                </div>

                                {
                                    msg.image && 
                                    <div style={{width:'30px'}}>
                                        {
                                            msg.image.match(/video/i)
                                            ? <video src={msg.image} width="100%"/>
                                            : <Avatar src={msg.image} size="medium-avatar"></Avatar>
                                        }
                                    </div>
                                }
                            </Link>
                            <small className="text-muted d-flex justify-content-between px-2">
                                {moment(msg.createdAt).fromNow()}
                                {
                                    !msg.isRead && <i className="fas fa-circle text-primary"></i>
                                }
                            </small>

                        </div>
                    ))
                }
            </div>

            <hr className="my-1" />

            <div className="text-right text-danger mr-2" style={{cursor:'pointer'}} onClick={handleDeleteAll}>
                Delete All
            </div>
            
        </div>
    )
}

export default NotifyModal
