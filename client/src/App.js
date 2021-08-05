import  {BrowserRouter ,Route} from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import { useDispatch, useSelector } from 'react-redux';
import Header from './component/Haader'
import Notify from './pages/Notify';
import Discover from './pages/Discover';
import Message from './pages/Message';
import Profile from './pages/Profile';
import StatusModal from './component/StatusModal';
import Post from './pages/Post';
import SocketClient from './SocketClient';
import { getSuggestions } from './_actions/suggestionActions';
import { io } from 'socket.io-client';
import { SOCKET } from './_constants/globalConstants';
import PrivateRouter from './customRouter/PrivateRouter';


function App() {
  
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  const status = useSelector(state => state.status)


  return (
    <BrowserRouter>
      <input type="checkbox" id="theme"/>
      <div className="App">
        <div className="main">
          {userInfo && <Header/>}
          {status && <StatusModal/>}
          {userInfo && <SocketClient/>}
          <PrivateRouter exact path="/post/:id" component={Post}/>
          <PrivateRouter exact path="/profile/:id" component={Profile}/>
          <PrivateRouter exact path="/message" component={Message}/>
          <PrivateRouter exact path="/discover" component={Discover}/>
          <PrivateRouter exact path="/notify" component={Notify}/>
          <Route exact path="/register" component={RegisterPage}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/home" component={userInfo? HomePage: LoginPage}/>
          <Route exact path="/" component={LoginPage}/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
