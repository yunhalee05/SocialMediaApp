import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../component/Haader'

function HomePage(props) {
    const userLogin = useSelector(state => state.userLogin)
    const userInfo = userLogin

    if(!userInfo){
        props.history.push('/login')
    }
    return (
        <div>
            HomePage
        </div>
    )
}

export default HomePage
