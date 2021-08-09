import React from 'react'
import { useSelector } from 'react-redux'
import Status from '../component/Status'
import Post from '../component/Post'
import SuggestionBox from '../component/Suggestion/SuggestionBox'

function HomePage(props) {
    const userLogin = useSelector(state => state.userLogin)
    const userInfo = userLogin

    if(!userInfo){
        props.history.push('/login')
    }
    return (
        <div className="home row mx-0">
            <div >
                <Status/>
                <SuggestionBox/>
                <Post />
            </div>
        </div>
    )
}

export default HomePage
