import { CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_RESET, CREATE_POST_SUCCESS, DELETE_POST_FAIL, DELETE_POST_REQUEST, DELETE_POST_RESET, DELETE_POST_SUCCESS, GET_HOME_POSTS_FAIL, GET_HOME_POSTS_REQUEST, GET_HOME_POSTS_SUCCESS, GET_POSTS_RESET, UPDATE_POST_FAIL, UPDATE_POST_REQUEST, UPDATE_POST_RESET, UPDATE_POST_SUCCESS } from "../_constants/postConstants";


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

export const postGetReducer = (state={}, action)=>{
    switch(action.type){
        case GET_HOME_POSTS_REQUEST:
            return {loading:true}
        case GET_HOME_POSTS_SUCCESS:
            return {loading:false, posts:action.payload, success:true}
        case GET_HOME_POSTS_FAIL:
            return {loading:false, error:action.payload, success:false}
        case GET_POSTS_RESET:
            return {}
        default:
            return state
    }
}

export const postUpdateReducer = (state={}, action)=>{
    switch(action.type){
        case UPDATE_POST_REQUEST:
            return {loading:true, success:false}
        case UPDATE_POST_SUCCESS:
            return {loading:false, updatedpost:action.payload, success:true}
        case UPDATE_POST_FAIL:
            return {loading:false, error:action.payload, success:false}
        case UPDATE_POST_RESET:
            return {}
        default:
            return state
    }
}

export const postDeleteReducer = (state={}, action)=>{
    switch(action.type){
        case DELETE_POST_REQUEST:
            return {loading:true, success:false}
        case DELETE_POST_SUCCESS:
            return {loading:false, success:true, deletedpost:action.payload}
        case DELETE_POST_FAIL:
            return {loading:false, error:action.payload, success:false}
        case DELETE_POST_RESET:
            return {}
        default:
            return state
    }
}