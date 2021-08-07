import{combineReducers, createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import { messageReducer } from './messageReducers';
import { notifyReducer } from './notifyReducers';
import { getSavedPostReducer, postCreateReducer, postDeleteReducer, postDetailReducer, postDiscoverReducer, postGetProfileReducer, postGetReducer, postLikeReducer, postSaveReducer, postUnlikeReducer, postUnsaveReducer, postUpdateReducer } from './postReducers';
import { getUserProfileReducer, userUpdateProfileReducer } from './profileReducers';
import socketReducer from './socketReducers';
import { editstatusReducer, statusReducer } from './statusReducers';
import { suggestionReducer } from './suggestionReducers';
import { themeReducer } from './themeReducers';
import { alertReducer, userLoginReducer, userRegisterReducer, userSuggestionReducer } from './userReducers';
import { onlineReducer } from './onlineCheckReducers'

const initialState={
    userLogin:{
        userInfo:localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')):null
    },
}


const reducer = combineReducers({
    userLogin:userLoginReducer,
    // userRegister:userRegisterReducer,
    alert:alertReducer,
    theme:themeReducer,
    userProfile:getUserProfileReducer,
    // userUpdateProfile:userUpdateProfileReducer,
    status:statusReducer,
    // createpost:postCreateReducer,
    getposts:postGetReducer,
    editstatus:editstatusReducer,
    // updatepost:postUpdateReducer,
    // deletepost:postDeleteReducer,
    // likepost:postLikeReducer,
    // unlikepost:postUnlikeReducer,
    // createcomment:commentCreateReducer,
    // likecomment:commentLikeReducer,
    // unlikecomment:commentUnlikeReducer,
    // updatecomment:commentUpdateReducer,
    // deletecomment:commentDeleteReducer,
    detailpost:postDetailReducer,
    discoverpost:postDiscoverReducer,
    suggestion:suggestionReducer,
    savepost:postSaveReducer,
    // unsavepost:postUnsaveReducer,
    socket:socketReducer,
    notify:notifyReducer,
    message:messageReducer,
    online:onlineReducer,

    


    

    

})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;