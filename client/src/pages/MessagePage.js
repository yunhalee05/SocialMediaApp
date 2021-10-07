import React from 'react'
import { useSelector } from 'react-redux'
import Alert from '../component/Alert'
import LeftSide from '../component/messages/LeftSide'
import Loading from '../component/Loading'
import chat from '../images/chat.png'

function Message(props) {
    const userLogin = useSelector(state => state.userLogin)
    const userInfo = userLogin

    if(!userInfo){
        props.history.push('/login')
    }
    const message = useSelector(state => state.message)
    
    return (
        <div style={{padding:"2rem"}}>
            {
                message.error
                && <Alert variant="danger">{message.error}</Alert>
            }
            {
                message.loading
                && <Loading></Loading>
            }

            <div className="message d-flex">
                <div className="col-md-4 border-right px-0 left-mess">
                    <LeftSide/>
                </div>
                <div className="col-md-8 px-0 right_mess" style={{backgroundColor:"#fcfcf5", borderRadius:"0 20px 20px 0"}}>
                    <div className="d-flex justify-content-center align-items-center flex-column h-100 chat_logo">
                        <img src={chat} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message
