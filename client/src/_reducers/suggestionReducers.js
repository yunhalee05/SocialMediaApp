import { GET_USER_SUGGESTION_FAIL, GET_USER_SUGGESTION_REQUEST, GET_USER_SUGGESTION_SUCCESS } from "../_constants/userConstants";
// const initialState={
//     users:[],
//     loading:false
// }

export const suggestionReducer = (state={users:[]}, action)=>{
    switch(action.type){
        case GET_USER_SUGGESTION_REQUEST:
            return {...state, loading:true}
        case GET_USER_SUGGESTION_SUCCESS:
            return {...state, loading:false, success:true ,users:action.payload.users, result:action.payload.result}
        case GET_USER_SUGGESTION_FAIL:
            return {...state, loading:false, succass:false, error:action.payload}
        default:
            return state;
    }
}