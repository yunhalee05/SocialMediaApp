import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useLocation} from 'react-router-dom'
import { logout } from '../_actions/userActions'
import { ALERT, THEME } from '../_constants/globalConstants'
import Avatar from './Avatar'
import LoadIcon from '../images/loading.gif'
import UserCard from './UserCard'

function Haader() {
    const navLinks = [
        { label: 'Home', icon: 'home', path: '/'},
        { label: 'Message', icon: 'near_me', path: '/message'},
        { label: 'Discover', icon: 'explore', path: '/discover'},
        {label:'Notify', icon:'favorite', path:'/notify'},
    ]

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo, loading, error} = userLogin;

    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    const [load, setLoad] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if(search && userInfo.token){
            async function get(){
                await axios.get(`/api/search?username=${search}`,{headers:{authorization : `Bearer ${userInfo.token}`}} )
                            .then(res=>setUsers(res.data.users))
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
    }, [search, userInfo.token, dispatch])

    const {theme} = useSelector(state => state.theme)
    const {pathname} = useLocation()
    const isActive = (pn) => {
        if(pn === pathname) return 'active'
    }

    const handleClose = () =>{
        setSearch('')
        setUsers([])
    }

    return (
        <div className="header bg-light">
            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
                
                <Link  to="/">
                    <h1 className="navbar-brand text-uppercase p-0 m-0" style={{fontSize:"2rem"}} >Social Media</h1>
                </Link>

                <form className="search_form">
                    <input type="text" name = "search" value={search} id="search"
                    onChange={e=>setSearch(e.target.value.toLowerCase().replace(/ /g, ''))} />
                    <div className="search_icon" style={{opacity:search? 0:0.3}}>
                        <span className="material-icons" >search</span>
                        <span>Search</span>
                    </div>
                    <div className="close_search" style={{opacity:users.length===0? 0:1}} onClick={handleClose}>&times;</div>
                    <button className="submit" style={{display:'none'}}>Search</button>
                    {
                        load && <img  className = "loading" src={LoadIcon} alt="loading" />
                    }
                    <div className="users">
                        {
                            search && users.map(user=>(
                                <UserCard key = {user._id} user={user} border="border" handleClose = {handleClose}/>
                            ))
                        }
                    </div>
                </form>

                <div className="menu">
                    <ul className="navbar-nav flex-row">
                        {
                            navLinks.map((link, index) => (
                                <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
                                    <Link className="nav-link" to={link.path}>
                                        <span className="material-icons">{link.icon}</span>
                                    </Link>
                                </li>
                            ))
                        }

                        <li className="nav-item dropdown" style={{opacity: 1}} >
                            <span className="nav-link dropdown-toggle" id="navbarDropdown" 
                            role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <Avatar src={userInfo.user.avatar} size = "medium-avatar"/>
                            </span>

                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to={`/profile/${userInfo.user._id}`}>Profile</Link>
                                <label className="dropdown-item" htmlFor="theme" onClick={()=>dispatch({type:THEME, payload:!theme})}>{theme ? 'Light mode':'Dark mode'}</label>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" to="/" onClick={()=>dispatch(logout())}>Logout</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Haader
