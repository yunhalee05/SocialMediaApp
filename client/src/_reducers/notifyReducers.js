import { CREATE_NOTIFY_FAIL, CREATE_NOTIFY_REQUEST, CREATE_NOTIFY_SUCCESS, DELETE_ALL_NOTIFY_FAIL, DELETE_ALL_NOTIFY_REQUEST, DELETE_ALL_NOTIFY_SUCCESS, GET_NOTIFY_FAIL, GET_NOTIFY_REQUEST, GET_NOTIFY_SUCCESS, READ_NOTIFY_FAIL, READ_NOTIFY_REQUEST, READ_NOTIFY_SUCCESS, REMOVE_NOTIFY_FAIL, REMOVE_NOTIFY_REQUEST, REMOVE_NOTIFY_SUCCESS } from "../_constants/notifyConstants";

export const notifyReducer = (state={ notify:[]}, action)=>{
    switch(action.type){
        case GET_NOTIFY_REQUEST:
            return {...state,loading:true}
        case GET_NOTIFY_SUCCESS:
            return {...state, loading:false, notify:action.payload}
        case GET_NOTIFY_FAIL:
            return {...state, loading:false, error:action.payload}

        case CREATE_NOTIFY_REQUEST:
            return {...state, loading:true}
        case CREATE_NOTIFY_SUCCESS:
            return {...state, loading:false, notify:[action.payload,...state.notify ]}
        case CREATE_NOTIFY_FAIL:
            return {...state, loading:false, error:action.payload}
        
        case REMOVE_NOTIFY_REQUEST:
            return {...state, loading:true}
        case REMOVE_NOTIFY_SUCCESS:
            return {...state, loading:false, notify: state.notify.filter(item=>item.id!==action.payload.id || item.url !== action.payload.url)}
        case REMOVE_NOTIFY_FAIL:
            return {...state, loading:false, error:action.payload}

        case READ_NOTIFY_REQUEST:
            return {...state, loading:true}
        case READ_NOTIFY_SUCCESS:
            return {...state, loading:false, notify: state.notify.map(item=>item._id===action.payload._id? action.payload:item)}
        case READ_NOTIFY_FAIL:
            return {...state, loading:false, error:action.payload}

        case DELETE_ALL_NOTIFY_REQUEST:
            return {...state, loading:true}
        case DELETE_ALL_NOTIFY_SUCCESS:
            return {...state, loading:false,notify:action.payload }
        case DELETE_ALL_NOTIFY_FAIL:
            return {...state, loading:false, error:action.payload}
            
        default :
            return state;

    }
}