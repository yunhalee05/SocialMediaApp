import { CHECK_ONLINE, CONVERSATION_DELETE_REQUEST, CONVERSATION_DELETE_SUCCESS, CONVERSATION_GET_FAIL, CONVERSATION_GET_REQUEST, CONVERSATION_GET_SUCCESS, MESSAGE_ADD_FAIL, MESSAGE_ADD_REQUEST, MESSAGE_ADD_SUCCESS, MESSAGE_ADD_USER, MESSAGE_DELETE_FAIL, MESSAGE_DELETE_REQUEST, MESSAGE_DELETE_SUCCESS, MESSAGE_GET_FAIL, MESSAGE_GET_MORE_FAIL, MESSAGE_GET_MORE_REQUEST, MESSAGE_GET_MORE_SUCCESS, MESSAGE_GET_REQUEST, MESSAGE_GET_SUCCESS } from "../_constants/messageConstants";

export const messageReducer = (state={ users:[], data:[]}, action)=>{
    switch(action.type){
        case MESSAGE_ADD_USER:
            if(state.users.every(item => item._id !== action.payload._id)){
                return {...state, users:[action.payload,...state.users]}
            }
            return state;

        case MESSAGE_ADD_REQUEST:
            return {...state, loading:true}
        case MESSAGE_ADD_SUCCESS:
            return {...state, 
                    loading:false, 
                    data:state.data.map(item=> 
                        item._id === action.payload.recipient || item._id ===action.payload.sender
                        ? {
                            ...item,
                            messages:[...item.messages, action.payload],
                            result:item.result + 1
                        }
                        : item
                    ),
                    users:state.users.map(user=>
                                            user._id ===action.payload.recipient || user._id ===action.payload.sender
                                            ?{...user, text:action.payload.text, media:action.payload.media, call:action.payload.call}     
                                            : user
                                        )}
                                        
        
        case MESSAGE_ADD_FAIL:
            return {...state, loading:false,  error:action.payload}

        case CONVERSATION_GET_REQUEST:
            return {...state, loading:true}
        case CONVERSATION_GET_SUCCESS:
            return {...state, loading:false, firstLoad: true, users:action.payload}
        case CONVERSATION_GET_FAIL:
            return {...state, loading:false, error:action.payload}


        case MESSAGE_GET_REQUEST:
            return {...state, loading:true}
        case MESSAGE_GET_SUCCESS:
            return {...state, loading:false, data:[...state.data, action.payload]}
        case MESSAGE_GET_FAIL:
            return {...state, loading:false, error:action.payload}

        case MESSAGE_GET_MORE_REQUEST:
            return {...state, loading:true}
        case MESSAGE_GET_MORE_SUCCESS:
            return {...state, loading:false, data:state.data.map(item=>item._id === action.payload._id? action.payload: item)}
        case MESSAGE_GET_MORE_FAIL:
            return {...state, loading:false, error:action.payload}

        case MESSAGE_DELETE_REQUEST:
            return {...state, loading:true}
        case MESSAGE_DELETE_SUCCESS:
            return {...state, 
                    data:state.data.map(item=>item._id===action.payload._id
                                    ? {...item, messages:action.payload.newMessages}
                                    : item)}
        case MESSAGE_DELETE_FAIL:
            return {...state, error:action.payload}

        case CONVERSATION_DELETE_REQUEST:
            return {...state, loading:true}
        case CONVERSATION_DELETE_SUCCESS:
            return {...state, 
                    data: state.data.filter(item=>item._id !== action.payload),
                    users: state.users.filter(item=>item._id !== action.payload)}
        
        case CHECK_ONLINE:
            return {...state, 
                    users:state.users.map(user=>
                            action.payload.includes(user._id)
                            ? {...user, online:true}
                            : {...user, online:false}
                        )}

        default:
            return state
    }
}

