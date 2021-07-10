import { CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_RESET, CREATE_POST_SUCCESS } from "../_constants/postConstants";


export const postCreateReducer = (state={}, action)=>{
    switch(action.type){
        case CREATE_POST_REQUEST:
            return {loading:true, success:false}
        case CREATE_POST_SUCCESS:
            return {loading:false, newpost:action.payload, success:true}
        case CREATE_POST_FAIL:
            return {loading:false, error:action.payload,success:false}
        case CREATE_POST_RESET:
            return {}
        default:
            return state
    }
}