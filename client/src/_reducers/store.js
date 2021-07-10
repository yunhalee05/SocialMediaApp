import{combineReducers, createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import { postCreateReducer } from './postReducers';
import { getUserProfileReducer, userUpdateProfileReducer } from './profileReducers';
import { statusReducer } from './statusReducers';
import themeReducer from './themeReducers';
import { alertReducer, userLoginReducer, userRegisterReducer } from './userReducers';


const initialState={
    userLogin:{
        userInfo:localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')):null
    },
}


const reducer = combineReducers({
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    alert:alertReducer,
    theme:themeReducer,
    userProfile:getUserProfileReducer,
    userUpdateProfile:userUpdateProfileReducer,
    status:statusReducer,
    newpost:postCreateReducer,

    

})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;