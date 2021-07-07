import React from 'react'
import { useSelector } from 'react-redux'

function Discover(props) {
    const userLogin = useSelector(state => state.userLogin)
    const userInfo = userLogin

    if(!userInfo){
        props.history.push('/login')
    }
    return (
        <div>
            Discover
        </div>
    )
}

export default Discover
