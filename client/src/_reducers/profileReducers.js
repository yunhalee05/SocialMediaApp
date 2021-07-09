import { PROFILE_GETUSER_FAIL, PROFILE_GETUSER_REQUEST, PROFILE_GETUSER_RESET, PROFILE_GETUSER_SUCCESS, USER_FOLLOW_PROFILE, USER_UNFOLLOW_PROFILE, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS } from "../_constants/profileConstants";

export const getUserProfileReducer = (state={}, action)=>{
    switch(action.type){
        case PROFILE_GETUSER_REQUEST:
            return {loading:true};
        case PROFILE_GETUSER_SUCCESS:
            return {loading:false, user:action.payload}
        case PROFILE_GETUSER_FAIL:
            return {loading:false, error:action.payload}
        case PROFILE_GETUSER_RESET:
            return {loading:true}
        case USER_FOLLOW_PROFILE:
            return {...state, user:action.payload}
        case USER_UNFOLLOW_PROFILE:
            return {...state, user:action.payload}
        default:
            return state;
    }
}

export const userUpdateProfileReducer = (state={}, action)=>{
    switch(action.type){
        case USER_UPDATE_PROFILE_REQUEST:
            return {loading:true}
        case USER_UPDATE_PROFILE_SUCCESS:
            return {loading:false, success:true}
        case USER_UPDATE_PROFILE_FAIL:
            return {loading:false, error:action.payload}
        case USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state
    }
}

