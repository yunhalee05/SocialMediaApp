import { CREATE_COMMENT_FAIL, CREATE_COMMENT_REQUEST, CREATE_COMMENT_RESET, CREATE_COMMENT_SUCCESS } from "../_constants/commentConstants";

export const commentCreateReducer = (state={}, action)=>{
    switch(action.type){
        case CREATE_COMMENT_REQUEST:
            return {loading:true}
        case CREATE_COMMENT_SUCCESS:
            return {newcomment:action.payload, loading:false}
        case CREATE_COMMENT_FAIL:
            return {loading:false, error:action.payload}
        case CREATE_COMMENT_RESET:
            return {}
        default:
            return state
    }
}
