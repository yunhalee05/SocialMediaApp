import{combineReducers, createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import { getUserProfileReducer } from './profileReducers';
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

    

})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;