import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../component/Haader'
import Status from '../component/Status'
import Post from '../component/Post'

function HomePage(props) {
    const userLogin = useSelector(state => state.userLogin)
    const userInfo = userLogin

    if(!userInfo){
        props.history.push('/login')
    }
    return (
        <div className="home row mx-0">
            <div className="col-md-8">
                <Status/>
                <Post />
            </div>
            <div className="col-md-4">

            </div>
        </div>
    )
}

export default HomePage
