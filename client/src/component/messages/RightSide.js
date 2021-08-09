import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, deleteConversation, getMessage, loadMoreMessages } from '../../_actions/messageActions'
import { ALERT } from '../../_constants/globalConstants'
import Icons from '../Icons'
import UserCard from '../UserCard'
import Display from './Display'
import LoadIcon from '../../images/loading.gif'
import { useHistory } from 'react-router-dom'
import { CALL } from '../../_constants/callConstants'
import {Link} from 'react-router-dom'
import Avatar from '../Avatar'


function RightSide({id}) {



    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const message = useSelector(state => state.message)

    const socket = useSelector(state => state.socket)
    const peer = useSelector(state => state.peer)

    const [user, setUser] = useState([])
    const [text, setText] = useState("")
    const [media, setMedia] = useState([])
    const [load, setLoad] = useState(false)

    const [data, setData] = useState([])
    const [result, setResult] = useState(9)
    const [page, setPage] = useState(0)
    const [isLoadMore, setIsLoadMore] = useState(false)
    const [limit, setLimit] = useState(9)

    const [preScrollHeight, setPreScrollHeight] = useState(0)

    const dispatch = useDispatch()
    const history = useHistory()

    const ref = useRef()
    const pageEnd = useRef()

    useEffect(() => {
        const newData = message.data.find(item=>item._id ===id)
        if(newData){
            setData(newData.messages)
            setResult(newData.result)
            setPage(newData.page)
        }
    }, [message.data, id])


    useEffect(() => {
        if(id && message.users.length>0){
            setTimeout(()=>{
                ref.current.scrollIntoView({behavior:'smooth', block:'end'})
            },50)
            const newUser = message.users.find(item=>item._id===id)
            if(newUser){
                setUser(newUser)
            }

        }
    }, [dispatch, id, message.users])


    useEffect(() => {
        const getMessageData = async()=>{
            const existingUser = message.data.filter(item=> item._id ===id)
            if(existingUser.length ===0){
                await dispatch(getMessage({id}))
                setTimeout(()=>{
                    ref.current.scrollIntoView({behavior:'smooth', block:'end'})
                },50)
            }
        }
        getMessageData()
    }, [id, dispatch, message.data])


    useEffect(() => {
        const observer = new IntersectionObserver(entries=>{
            if(entries[0].isIntersecting){
                setIsLoadMore(true)
            }
        },{
            threshold:0.1
        })
        observer.observe(pageEnd.current)
    }, [])

    useEffect(() => {
        if(isLoadMore){
            if(result > limit || result===limit){
                setPage(page=>page+1)
                dispatch(loadMoreMessages({id, page:page+1, limit}))
            }
            setIsLoadMore(false)      
        }
    }, [isLoadMore])




    const handleChangeMedia=(e) =>{

        const files = [...e.target.files]
        let newMedia= []
        let err = ''

        files.forEach(file=>{
            if(!file) return err = "File doesn't exist."
            // if(file.size >1024*1024*5){
            //     return err = "The image largest is 5mb."
            // }
            if(file.type !== 'image/jpeg' && file.type !=='image/png' && file.type !== 'video/mp4' && file.type !== 'video/avi' && file.type !== 'video/wmv' && file.type !=='video/mov'){
                return err = "File format is incorrect."
            }
            return newMedia.push(file)
        })

        if(err) dispatch({type:ALERT, payload:{error:err}})

        setMedia([...media, ...newMedia])
    }

    const imageShow=(src) =>{
        return (
            <img src={src} alt="images" className="img-thumbnail" />
        )
    }

    const videoShow=(src) =>{
        return (
            <video src={src} alt="images" className="img-thumbnail" />
        )
    }
    
    const handleDeleteMedia= (index)=>{
        const newArr=[...media]
        newArr.splice(index, 1)
        setMedia(newArr)
    }

    const handleSubmit= async(e)=>{
        e.preventDefault()

        if(!text.trim() && media.length===0)return ;

        setLoad(true)
        
        const msg={
            sender: userInfo.user._id,
            recipient:id,
            text,
            media,
            createdAt:new Date().toISOString()
        }


        await dispatch(addMessage({msg}))
        
        setText('')
        setMedia([])
        setLoad(false)

        if(ref.current){
            setTimeout(()=>{
                ref.current.scrollIntoView({behavior:'smooth', block:'end'})
            },50)
        }
    }
    
    const handleDeleteConversation = ()=>{
        if(window.confirm('Are you sure to leave this chat room?')){
            dispatch(deleteConversation({id}))
            return history.push('/message')
        }
    }

    const caller=({video})=>{
        const {_id, avatar, username, fullname} = user
        const msg = {
            sender: userInfo.user._id,
            recipient:_id,
            avatar,
            username, 
            fullname,
            video
        }
        dispatch({
            type:CALL,
            payload:msg
        })
    }

    const callUser = ({video})=>{
        const {_id, avatar, username, fullname} = userInfo.user
        const msg = {
            sender: _id,
            recipient:user._id,
            avatar,
            username, 
            fullname,
            video
        }
        if(peer.open){
            msg.peerId = peer._id
        }
        socket.emit('callUser', msg)

        

    }

    const handleAudioCall=() =>{
        caller({video:false})
        callUser({video:false})
    }

    const handleVideoCall= () =>{
        caller({video:true})
        callUser({video:true})

    }


    return (
        <>
            <div className="message_header" style={{cursor:'pointer'}}>
                {
                    user.length !== 0 &&
                    <UserCard user={user} id = {id}>
                        <div>
                            <i className="fas fa-phone-alt p-1" onClick={handleAudioCall}></i>
                            <i className="fas fa-video mx-3 p-1" onClick={handleVideoCall}></i>
                            <i className="fas fa-trash p-1" style={{color:"#6e6e6e"}} onClick={handleDeleteConversation}></i>
                        </div>
                    </UserCard>
                }
            </div>
            <div className="chat_container" style={{height: media.length >0? 'calc(100%-180px)':''}} >
                <div className="chat_display" ref={ref}  >
                    <button style={{marginTop:'-25px', opacity:0}} ref={pageEnd}>
                        Loadmore
                    </button>
                    {
                        data.map((msg, index)=>(
                            <div key={index}>
                                {
                                    msg.sender !== userInfo.user._id &&
                                    <div className="chat_row other_message">
                                        <Display user={user} msg={msg}/>
                                    </div>
                                }
                                
                                {
                                    msg.sender === userInfo.user._id &&
                                    <div className="chat_row you_message">
                                        <Display user={userInfo.user} msg={msg} data={data}/>
                                    </div>
                                }

                            </div>
                        ))
                    }

                </div>
            </div>
            {
                load &&
                <div className="chat_row you_message">
                    <img src={LoadIcon} alt="loading" />
                </div>
            }

            <div className="show_media" style={{display: media.length>0? 'grid':'none'}}>
                {
                    media && 
                    media.map((item, index)=>(
                        <div key={index} id="file_media">
                            {
                                item.type.match(/video/i)
                                ? videoShow(URL.createObjectURL(item))
                                : imageShow(URL.createObjectURL(item))
                            }
                            <span onClick={()=> handleDeleteMedia(index)}>&times;</span>
                        </div>
                    ))
                }
            </div>

            <form className="chat_input" onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter your Message." value={text} onChange={(e)=>setText(e.target.value)}/>

                <Icons setContent={setText} content={text}/>

                <div className="file_upload">
                    <i className="fas fa-image text-danger"></i>
                    <input type="file" name="file" id ="file" multiple accept="image/*, video/*" onChange={handleChangeMedia}/>
                </div>

                <button type="submit" className="material-icons" disabled={text || media.length> 0? false : true}>
                    near_me
                </button>
            </form>
        </>
    )
}

export default RightSide
