import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadIcon from '../../images/loading.gif'
import FollowBtn from '../FollowBtn'
import { getSuggestions } from '../../_actions/suggestionActions'
import SuggestionCard from './SuggestionCard'
import Alert from '../Alert'

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
        <div className="mt-3" style={{background:'#f2f2f2'}}>
            {
                suggestion.error
                && <Alert variant="danger">{suggestion.error}</Alert>
            }
            <div className=" text-center p-2">
                <h5 >Suggestions for you 
                {
                    !suggestion.loading &&
                    <i className="fas fa-redo ml-3" style={{cursor:'pointer'}} onClick={()=>dispatch(getSuggestions())}/>
                }
                </h5>
            </div>

            {
                suggestion.loading
                ? <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4"/>
                : suggestion.users &&
                <div className="suggestion" style={{display:'flex', justifyContent:'space-between', overflow:'scroll'}}>
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
