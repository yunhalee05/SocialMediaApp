import { CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_RESET, CREATE_POST_SUCCESS, DELETE_POST_FAIL, DELETE_POST_REQUEST, DELETE_POST_RESET, DELETE_POST_SUCCESS, GET_DISCOVER_POST_FAIL, GET_DISCOVER_POST_REQUEST, GET_DISCOVER_POST_RESET, GET_DISCOVER_POST_SUCCESS, GET_DISCOVER_POST_UPDATE, GET_HOME_POSTS_FAIL, GET_HOME_POSTS_REQUEST, GET_HOME_POSTS_SUCCESS, GET_MORE_POST_FAIL, GET_MORE_POST_REQUEST, GET_MORE_POST_SUCCESS, GET_POSTS_RESET, GET_POST_FAIL, GET_POST_REQUEST, GET_POST_SUCCESS, GET_PROFILE_POSTS_FAIL, GET_PROFILE_POSTS_REQUEST, GET_PROFILE_POSTS_RESET, GET_PROFILE_POSTS_SUCCESS, GET_SAVE_POST_FAIL, GET_SAVE_POST_REQUEST, GET_SAVE_POST_SUCCESS, GET_SAVE_POST_UPDATE, LIKE_POST_FAIL, LIKE_POST_REQUEST, LIKE_POST_RESET, LIKE_POST_SUCCESS, SET_SAVE_POST_FAIL, SET_SAVE_POST_REQUEST, SET_SAVE_POST_SUCCESS, SET_UNSAVE_POST_FAIL, SET_UNSAVE_POST_REQUEST, SET_UNSAVE_POST_SUCCESS, UNLIKE_POST_FAIL, UNLIKE_POST_REQUEST, UNLIKE_POST_RESET, UNLIKE_POST_SUCCESS, UPDATE_POST_FAIL, UPDATE_POST_REQUEST, UPDATE_POST_RESET, UPDATE_POST_SUCCESS } from "../_constants/postConstants";

// const initialState={
//     loading:false, 
//     posts:[]
// }


// export const postCreateReducer = (state={}, action)=>{
//     switch(action.type){
//         case CREATE_POST_REQUEST:
//             return {loading:true, success:false}
//         case CREATE_POST_SUCCESS:
//             return {loading:false, newpost:action.payload, success:true}
//         case CREATE_POST_FAIL:
//             return {loading:false, error:action.payload,success:false}
//         case CREATE_POST_RESET:
//             return {}
//         default:
//             return state
//     }
// }

export const postGetReducer = (state={ posts:[]}, action)=>{
    switch(action.type){
        case GET_HOME_POSTS_REQUEST:
            return {loading:true}
        case GET_HOME_POSTS_SUCCESS:
            return {loading:false, posts:action.payload.posts, result:action.payload.result}
        case GET_HOME_POSTS_FAIL:
            return {loading:false, error:action.payload}
        case GET_POSTS_RESET:
            return {}

        case CREATE_POST_REQUEST:
            return {...state, loading:true}
        case CREATE_POST_SUCCESS:
            return {...state, loading:false, posts:[ action.payload,...state.posts]}
        case CREATE_POST_FAIL:
            return {...state,loading:false, error:action.payload}
  
        case UPDATE_POST_REQUEST:
            return {...state, loading:true}
        case UPDATE_POST_SUCCESS:
            return {...state, loading:false, posts:state.posts.map(item=>item._id === action.payload._id? action.payload:item)}
        case UPDATE_POST_FAIL:
            return {...state, loading:false, error:action.payload}

        case DELETE_POST_REQUEST:
            return {...state, loading:true}
        case DELETE_POST_SUCCESS:
            return {...state, loading:false,posts:state.posts.filter(item=>item._id !==action.payload)}
        case DELETE_POST_FAIL:
            return {...state, loading:false, error:action.payload}

        case LIKE_POST_REQUEST:
            return {...state, loading:true}
        case LIKE_POST_SUCCESS:
            return {...state,loading:false, posts:state.posts.map(item=>item._id===action.payload._id? action.payload:item)}
        case LIKE_POST_FAIL:
            return {...state, loading:false,error:action.payload}

        case UNLIKE_POST_REQUEST:
            return {...state, loading:true}
        case UNLIKE_POST_SUCCESS:
            return {...state,loading:false, posts:state.posts.map(item=>item._id===action.payload._id? action.payload:item)}
        case UNLIKE_POST_FAIL:
            return {...state, loading:false,error:action.payload}

        case GET_MORE_POST_REQUEST:
            return {...state, loading:true}
        case GET_MORE_POST_SUCCESS:
            return {...state, loading:false, posts:[...state.posts, ...action.payload.posts], result:action.payload.result}
        case GET_MORE_POST_FAIL:
            return {...state, loading:false, error:action.payload}

        default:
            return state
    }
}

// export const postUpdateReducer = (state={}, action)=>{
//     switch(action.type){
//         case UPDATE_POST_REQUEST:
//             return {loading:true, success:false}
//         case UPDATE_POST_SUCCESS:
//             return {loading:false, updatedpost:action.payload, success:true}
//         case UPDATE_POST_FAIL:
//             return {loading:false, error:action.payload, success:false}
//         case UPDATE_POST_RESET:
//             return {}
//         default:
//             return state
//     }
// }

// export const postDeleteReducer = (state={}, action)=>{
//     switch(action.type){
//         case DELETE_POST_REQUEST:
//             return {loading:true, success:false}
//         case DELETE_POST_SUCCESS:
//             return {loading:false, success:true, deletedpost:action.payload}
//         case DELETE_POST_FAIL:
//             return {loading:false, error:action.payload, success:false}
//         case DELETE_POST_RESET:
//             return {}
//         default:
//             return state
//     }
// }

// export const postLikeReducer = (state={}, action)=>{
//     switch(action.type){
//         case LIKE_POST_REQUEST:
//             return {loading:true, success:false}
//         case LIKE_POST_SUCCESS:
//             return {loading:false, success:true, likedpost:action.payload}
//         case LIKE_POST_FAIL:
//             return {loading:false, success:false, error:action.payload}
//         case LIKE_POST_RESET:
//             return {}
//         default:
//             return state
//     }
// }

// export const postUnlikeReducer = (state={}, action)=>{
//     switch(action.type){
//         case UNLIKE_POST_REQUEST:
//             return {loading:true, success:false}
//         case UNLIKE_POST_SUCCESS:
//             return {loading:false, success:true, unlikedpost:action.payload}
//         case UNLIKE_POST_FAIL:
//             return {loading:false, success:false, error:action.payload}
//         case UNLIKE_POST_RESET:
//             return {}
//         default:
//             return state
//     }
// }


export const postDetailReducer = (state={}, action)=>{
    switch(action.type){
        case GET_POST_REQUEST:
            return {loading:true}
        case GET_POST_SUCCESS:
            return {loading:false, postdetail:action.payload}
        case GET_POST_FAIL:
            return {loading:false, error:action.payload}
    
        case UPDATE_POST_REQUEST:
            return {...state, loading:true}
        case UPDATE_POST_SUCCESS:
            return {...state, loading:false, postdetail:action.payload}
        case UPDATE_POST_FAIL:
            return {...state, loading:false, error:action.payload}

        case DELETE_POST_REQUEST:
            return {...state, loading:true}
        case DELETE_POST_SUCCESS:
            return {deleteSuccess:true}
        case DELETE_POST_FAIL:
            return {...state, loading:false, error:action.payload}
        case DELETE_POST_RESET:
            return {}

        case LIKE_POST_REQUEST:
            return {...state, loading:true}
        case LIKE_POST_SUCCESS:
            return {...state, loading:false, postdetail:action.payload}
        case LIKE_POST_FAIL:
            return {...state, loading:false,error:action.payload}

        case UNLIKE_POST_REQUEST:
            return {...state, loading:true}
        case UNLIKE_POST_SUCCESS:
            return {...state, loading:false, postdetail:action.payload}
        case UNLIKE_POST_FAIL:
            return {...state, loading:false,error:action.payload}



        default:
            return state
    }
}


export const postDiscoverReducer = (state={ posts:[]}, action)=>{
    switch(action.type){
        case GET_DISCOVER_POST_REQUEST:
            return {...state, loading:true, success:false}
        case GET_DISCOVER_POST_SUCCESS:
            return {...state,loading:false, success:true, posts:[...action.payload.posts], result:action.payload.result, firstLoad:true}
        case GET_DISCOVER_POST_FAIL:
            return {...state,loading:false, success:false, error:action.payload}
        case GET_DISCOVER_POST_UPDATE:
            return {...state, posts:action.payload.posts, result:action.payload.result}

        case LIKE_POST_REQUEST:
            return {...state, loading:true}
        case LIKE_POST_SUCCESS:
            return {...state,loading:false, posts:state.posts.map(item=>item._id===action.payload._id? action.payload:item)}
        case LIKE_POST_FAIL:
            return {...state,loading:false,error:action.payload}

        case UNLIKE_POST_REQUEST:
            return {...state, loading:true}
        case UNLIKE_POST_SUCCESS:
            return {...state,loading:false, posts:state.posts.map(item=>item._id===action.payload._id? action.payload:item)}
        case UNLIKE_POST_FAIL:
            return {...state, loading:false,error:action.payload}

    

        default:
            return state
    }
}

export const postSaveReducer = (state={}, action)=>{
    switch(action.type){
        case SET_SAVE_POST_REQUEST:
            return {loading:true, success:false}
        case SET_SAVE_POST_SUCCESS:
            return {loading:false, success:true, savedpost:action.payload}
        case SET_SAVE_POST_FAIL:
            return {loading:false, success:false, error:action.payload}

        case SET_UNSAVE_POST_REQUEST:
            return {loading:true, success:false}
        case SET_UNSAVE_POST_SUCCESS:
            return {loading:false, success:true, unsavedpost:action.payload}
        case SET_UNSAVE_POST_FAIL:
            return {loading:false, success:false, error:action.payload}

        default:
            return state;
    }
}


// export const postUnsaveReducer = (state={}, action)=>{
//     switch(action.type){
//         case SET_UNSAVE_POST_REQUEST:
//             return {loading:true, success:false}
//         case SET_UNSAVE_POST_SUCCESS:
//             return {loading:false, success:true, unsavedpost:action.payload}
//         case SET_UNSAVE_POST_FAIL:
//             return {loading:false, success:false, error:action.payload}
//         default:
//             return state;
//     }
// }

