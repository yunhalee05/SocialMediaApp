import React from 'react'
import { useSelector } from 'react-redux'

function Message(props) {
    const userLogin = useSelector(state => state.userLogin)
    const userInfo = userLogin

    if(!userInfo){
        props.history.push('/login')
    }
    return (
        <div>
            Message
        </div>
    )
}

export default Message
