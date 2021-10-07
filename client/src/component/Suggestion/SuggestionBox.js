import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadIcon from '../../images/loading.gif'
import FollowBtn from '../common/FollowBtn'
import { getSuggestions } from '../../_actions/suggestionActions'
import SuggestionCard from './SuggestionCard'
import Alert from '../common/Alert'

function SuggestionBox() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const suggestion = useSelector(state => state.suggestion)

    const dispatch = useDispatch()

    
    useEffect(() => {
        if(userInfo.token){
            dispatch(getSuggestions())
        }
    }, [userInfo.token, dispatch])


    return (
        <div className="mt-3" style={{background:'#f4f0f7'}}>
            {
                suggestion.error
                && <Alert variant="danger">{suggestion.error}</Alert>
            }
            <div className="text-center" style={{fontWeight:"800", fontSize:"1.4rem", textTransform:"uppercase", color:"white",WebkitTextStroke:"1px black", paddingTop:"2rem"}}> 
                <div >Suggestions for you 
                {
                    !suggestion.loading &&
                    <i className="fas fa-redo ml-3" style={{cursor:'pointer', color:"#c46c23"}} onClick={()=>dispatch(getSuggestions())}/>
                }
                </div>
            </div>

            {
                suggestion.loading
                ? <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4"/>
                : suggestion.users &&
                <div className="suggestion">
                    {
                        suggestion.users.map(user=>(
                            <SuggestionCard key={user._id}  user={user}>
                                <FollowBtn user={user} userId={user._id}/>
                            </SuggestionCard>
                        ))
                    }
                </div>
            }

            
        </div>
    )
}

export default SuggestionBox
