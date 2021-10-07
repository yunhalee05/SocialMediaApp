import React from 'react'
import { useSelector } from 'react-redux'
import Status from '../component/status/Status'
import Post from '../component/post/Post'
import SuggestionBox from '../component/suggestion/SuggestionBox'

function HomePage(props) {
    const userLogin = useSelector(state => state.userLogin)
    const userInfo = userLogin

    if(!userInfo){
        props.history.push('/login')
    }
    return (
        <div className="home mx-0">
            <div >
                <Status/>
                <SuggestionBox/>
                <Post />
            </div>
        </div>
    )
}

export default HomePage
