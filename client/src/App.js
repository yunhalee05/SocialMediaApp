import  {BrowserRouter,Route} from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import { useSelector } from 'react-redux';
import Header from './component/Haader'
import Notify from './pages/Notify';
import Discover from './pages/Discover';
import Message from './pages/Message';


function App() {
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  return (
    <BrowserRouter>
      <input type="checkbox" id="theme"/>
      <div className="App">
        <div className="main">
          {userInfo && <Header/>}
          <Route exact path="/message" component={Message}/>
          <Route exact path="/discover" component={Discover}/>
          <Route exact path="/notify" component={Notify}/>
          <Route exact path="/register" component={RegisterPage}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/home" component={HomePage}/>
          <Route exact path="/" component={LoginPage}/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
