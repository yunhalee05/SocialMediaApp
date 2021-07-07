import React from 'react'
import { useSelector } from 'react-redux'

function Notify(props) {
    const userLogin = useSelector(state => state.userLogin)
    const userInfo = userLogin

    if(!userInfo){
        props.history.push('/login')
    }
    return (
        <div>
            Notify
        </div>
    )
}

export default Notify
