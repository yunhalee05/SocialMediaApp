import{combineReducers, createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import { messageReducer } from './messageReducers';
import { notifyReducer } from './notifyReducers';
import { postDetailReducer, postDiscoverReducer, postGetReducer, postSaveReducer } from './postReducers';
import { getUserProfileReducer } from './profileReducers';
import socketReducer from './socketReducers';
import { editstatusReducer, statusReducer } from './statusReducers';
import { suggestionReducer } from './suggestionReducers';
import { themeReducer } from './themeReducers';
import { alertReducer, userLoginReducer } from './userReducers';
import { onlineReducer } from './onlineCheckReducers'
import { callReducer, peerReducer } from './callReducers';

const initialState={
    userLogin:{
        userInfo:localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')):null
    },
}


const reducer = combineReducers({
    userLogin:userLoginReducer,
    alert:alertReducer,
    theme:themeReducer,
    userProfile:getUserProfileReducer,
    status:statusReducer,
    getposts:postGetReducer,
    editstatus:editstatusReducer,
    detailpost:postDetailReducer,
    discoverpost:postDiscoverReducer,
    suggestion:suggestionReducer,
    savepost:postSaveReducer,
    socket:socketReducer,
    notify:notifyReducer,
    message:messageReducer,
    online:onlineReducer,
    call:callReducer,
    peer:peerReducer

})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;