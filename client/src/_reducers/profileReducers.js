import { PROFILE_GETPOST_SUCCESS, PROFILE_GETUSER_RESET, PROFILE_GETUSER_SUCCESS, PROFILE_GET_FAIL, PROFILE_GET_REQUEST, USER_FOLLOW_PROFILE, USER_UNFOLLOW_PROFILE, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../_constants/profileConstants";


const initialState={
    loading:false,
    users:[],
    posts:[],
    updateSuccess:false,
}
export const getUserProfileReducer = (state=initialState, action)=>{
    switch(action.type){
        case PROFILE_GET_REQUEST:
            return {loading:true};
        case PROFILE_GETUSER_SUCCESS:
            return {...state, loading:false, user:action.payload}
        case PROFILE_GETPOST_SUCCESS:
            return {...state, loading:false, posts:action.payload}
        case PROFILE_GET_FAIL:
            return {...state, loading:false, error:action.payload}

        case PROFILE_GETUSER_RESET:
            return {loading:true}

        case USER_UPDATE_PROFILE_REQUEST:
            return {...state, loading:true}
        case USER_UPDATE_PROFILE_SUCCESS:
            return {...state, loading:false, updateSuccess:true}
        case USER_UPDATE_PROFILE_FAIL:
            return {...state, loading:false, updateSuccess:false, error:action.payload}

        case USER_FOLLOW_PROFILE:
            return {...state, user:action.payload}
        case USER_UNFOLLOW_PROFILE:
            return {...state, user:action.payload}

        default:
            return state;
    }
}

// export const userUpdateProfileReducer = (state={}, action)=>{
//     switch(action.type){
//         case USER_UPDATE_PROFILE_REQUEST:
//             return {loading:true}
//         case USER_UPDATE_PROFILE_SUCCESS:
//             return {loading:false, success:true}
//         case USER_UPDATE_PROFILE_FAIL:
//             return {loading:false, error:action.payload}
//         case USER_UPDATE_PROFILE_RESET:
//             return {}
//         default:
//             return state
//     }
// }

