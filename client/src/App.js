import  {BrowserRouter ,Route} from 'react-router-dom'
import React, { useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import { useDispatch, useSelector } from 'react-redux';
import Header from './component/header/Header'
import Discover from './pages/Discover';
import MessagePage from './pages/MessagePage';
import Profile from './pages/Profile';
import StatusModal from './component/status/StatusModal';
import Post from './pages/Post';
import SocketClient from './SocketClient';
import { io } from 'socket.io-client';
import { SOCKET } from './_constants/globalConstants';
import PrivateRouter from './customRouter/PrivateRouter';
import Message from './component/messages/Message';
import CallModal from './component/messages/CallModal';
import Peer from 'peerjs'
import { PEER } from './_constants/callConstants';
import SocialLogin from './pages/SocialLogin';


function App() {
  
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  const status = useSelector(state => state.status)
  const call = useSelector(state => state.call)

  const socket = useSelector(state => state.socket)

  const dispatch = useDispatch()



  useEffect(() => {
    const socket = io();

      dispatch({
        type:SOCKET,
        payload:socket
      })
      return ()=>socket.close()
    }, [dispatch])

    
  useEffect(() => {
    const newPeer = new Peer(undefined,{
      host:'/', port:'3001'
    })
    dispatch({
      type:PEER,
      payload:newPeer
    })
  }, [])

  return (
    <BrowserRouter>
      {/* <input type="checkbox" id="theme"/> */}
      <div className="App">
        <div className="main-header">
          {userInfo && <Header/>}
        </div>
        <div className="main">
          {status && <StatusModal/>}
          {(userInfo && socket.io) && <SocketClient/>}
          {call && <CallModal/>}
          <PrivateRouter exact path="/post/:id" component={Post}/>
          <PrivateRouter exact path="/profile/:id" component={Profile}/>
          <PrivateRouter exact path="/message" component={MessagePage}/>
          <PrivateRouter exact path="/message/:id" component={Message}/>
          <PrivateRouter exact path="/discover" component={Discover}/>
          <Route exact path="/register" component={RegisterPage}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/home" component={userInfo? HomePage: LoginPage}/>
          <Route exact path="/" component={LoginPage}/>
          <Route exact path="/auth/:social" component={SocialLogin}/>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
