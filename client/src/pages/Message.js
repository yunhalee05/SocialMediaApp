import React from 'react'
import { useSelector } from 'react-redux'
import LeftSide from '../component/messages/LeftSide'
import RightSide from '../component/messages/RightSide'

function Message(props) {
    const userLogin = useSelector(state => state.userLogin)
    const userInfo = userLogin

    if(!userInfo){
        props.history.push('/login')
    }
    return (
        <div className="message d-flex">
            <div className="col-md-4 border-right px-0 left-mess">
                <LeftSide/>
            </div>
            <div className="col-md-8 px-0">
                <RightSide />
            </div>
        </div>
    )
}

export default Message
