import React from 'react'
import { useSelector } from 'react-redux'
import Status from '../component/Status'
import Post from '../component/Post'
import SuggestionBox from '../component/Suggestion/SuggestionBox'
import Loading from '../component/Loading'

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
