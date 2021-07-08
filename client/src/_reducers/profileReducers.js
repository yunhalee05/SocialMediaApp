import { PROFILE_GETUSER_FAIL, PROFILE_GETUSER_REQUEST, PROFILE_GETUSER_RESET, PROFILE_GETUSER_SUCCESS } from "../_constants/profileConstants";

export const getUserProfileReducer = (state={loading:true}, action)=>{
    switch(action.type){
        case PROFILE_GETUSER_REQUEST:
            return {loading:true};
        case PROFILE_GETUSER_SUCCESS:
            return {loading:false, user:action.payload}
        case PROFILE_GETUSER_FAIL:
            return {loading:false, error:action.payload}
        case PROFILE_GETUSER_RESET:
            return {loading:true}
        default:
            return state;
    }
}