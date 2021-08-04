const {USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGIN_REQUEST, USER_LOGIN_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, ALERT, GET_USER_SUGGESTION_REQUEST, GET_USER_SUGGESTION_SUCCESS, GET_USER_SUGGESTION_FAIL, GET_USER} = require('../_constants/userConstants')

export const userLoginReducer = (state={}, action)=>{
    switch(action.type){
        case GET_USER:
            return {loading:false, userInfo:action.payload}

        case USER_LOGIN_REQUEST:
            return {loading:true};
        case USER_LOGIN_SUCCESS:
            return {loading:false, userInfo:action.payload}
        case USER_LOGIN_FAIL:
            return {loading:false, error:action.payload}
        case USER_REGISTER_REQUEST:
            return {loading:true}
        case USER_REGISTER_SUCCESS:
            return {loading:false, userInfo:action.payload}
        case USER_REGISTER_FAIL:
            return {loading:false, error:action.payload}
        case USER_LOGIN_LOGOUT:
            return {msg:action.payload};
        default:
            return state;
    }
}

// export const userRegisterReducer = (state={}, action)=>{
//     switch(action.type){
//         case USER_REGISTER_REQUEST:
//             return {loading:true}
//         case USER_REGISTER_SUCCESS:
//             return {loading:false, userInfo:action.payload}
//         case USER_REGISTER_FAIL:
//             return {loading:false, error:action.payload}
//         default:
//             return state;
//     }
// }

export const alertReducer = (state={}, action)=>{
    switch(action.type){
        case ALERT:
            return action.payload
        default:
            return state

    }
}
