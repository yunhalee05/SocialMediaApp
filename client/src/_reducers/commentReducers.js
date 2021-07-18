import { CREATE_COMMENT_FAIL, CREATE_COMMENT_REQUEST, CREATE_COMMENT_RESET, CREATE_COMMENT_SUCCESS, LIKE_COMMENT_FAIL, LIKE_COMMENT_REQUEST, LIKE_COMMENT_RESET, LIKE_COMMENT_SUCCESS, UNLIKE_COMMENT_FAIL, UNLIKE_COMMENT_REQUEST, UNLIKE_COMMENT_RESET, UNLIKE_COMMENT_SUCCESS } from "../_constants/commentConstants";

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

export const commentLikeReducer = (state={}, action)=>{
    switch(action.type){
        case LIKE_COMMENT_REQUEST:
            return {loading:true}
        case LIKE_COMMENT_SUCCESS:
            return {loading:false, comment:action.payload}
        case LIKE_COMMENT_FAIL:
            return {loading:false, error:action.payload}
        case LIKE_COMMENT_RESET:
            return {}
        default:
            return state
    }
}

export const commentUnlikeReducer = (state={}, action)=>{
    switch(action.type){
        case UNLIKE_COMMENT_REQUEST:
            return {loading:true}
        case UNLIKE_COMMENT_SUCCESS:
            return {loading:false, comment:action.payload}
        case UNLIKE_COMMENT_FAIL:
            return {loading:false, error:action.payload}
        case UNLIKE_COMMENT_RESET:
            return {}
        default:
            return state
    }
}