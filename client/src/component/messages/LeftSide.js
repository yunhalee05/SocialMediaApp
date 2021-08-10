import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getConversation } from '../../_actions/messageActions'
import { ALERT } from '../../_constants/globalConstants'
import { CHECK_ONLINE, MESSAGE_ADD_USER } from '../../_constants/messageConstants'
import UserCard from '../UserCard'
import LoadIcon from '../../images/loading.gif'

function LeftSide({id}) {


    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const message = useSelector(state => state.message)

    const online = useSelector(state => state.online)

    const [search, setSearch] = useState("")
    const [load, setLoad] = useState(false)
    const [users, setUsers] = useState([])

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if(message.firstLoad) return;
        dispatch(getConversation())
    }, [dispatch, message.firstLoad])

    const handleSearch=(e)=>{
        e.preventDefault()

        if(search && userInfo.token){
            async function get(){
                await axios.get(`/api/search?username=${search}`,{headers:{authorization : `Bearer ${userInfo.token}`}} )
                            .then(res=>setUsers(res.data.users.filter(user=>user._id !== userInfo.user._id)))
                            .catch(err=>{
                                dispatch({
                                    type:ALERT,
                                    payload:{error:err.response.data.message}
                                })
                            })
            }
            setLoad(true)
            get();
            setLoad(false)
        }else{
            setUsers([])
        }
        
    }

    const handleAddUser=(user)=>{
        const existingUser = message.users.filter(item=>item._id===user._id)
        console.log(existingUser)
        if(existingUser.length===0){
            dispatch({
                type:MESSAGE_ADD_USER,
                payload:{...user, text:'', media:[]}
            })
        }
        

        setSearch('')
        setUsers([])
        return history.push(`/message/${user._id}`)

    }

    const isActive=(user)=>{
        if(id===user._id) return 'active'
        return ''
    }

    //check user online/offline
    useEffect(() => {
        if(message.firstLoad){
            dispatch({
                type:CHECK_ONLINE,
                payload:online
            })
        }
    }, [online, message.firstLoad, dispatch])

    return (
        <>
            <form className="message_header" onSubmit={handleSearch}>
                <input type="text" value={search} placeholder="Enter to Search" onChange={e=>setSearch(e.target.value)}/>
                <button type="submit" style={{display:'none'}}>Search</button>
            </form>

            <div className="message_chat_list">
                {
                    users.length !== 0
                    ? <>
                        {   
                            load 
                            ? <img src={LoadIcon} alt="loading" />
                            : users.map(user=>(
                                <div key={user._id} className={`message_user ${isActive(user)}`} onClick={()=>handleAddUser(user)}>
                                    <UserCard user={user} id={user._id}  />
                                </div>
                            )) 
                        }
                    </>
                    : <>
                    {
                        message.users.map(user=>(
                            <div key={user._id} className={`message_user ${isActive(user)}`} onClick={()=>handleAddUser(user)}>
                                <UserCard user={user} id={user._id} msg={true}>
                                    {
                                        user.online 
                                        ?<i className="fas fa-circle text-success"></i>
                                        : userInfo.user.following.find(item=>item._id === user._id)
                                         && <i className="fas fa-circle"></i>

                                    }
                                </UserCard>
                            </div>
                        ))
                    }
                    </>
                }
            </div>
        </>
    )
}

export default LeftSide
