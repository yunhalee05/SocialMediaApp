import { OFFLINE, ONLINE } from "../_constants/onlineCheckConstants";

export const onlineReducer = (state=[], action)=>{
    switch(action.type){
        case ONLINE:
            return [...state, action.payload ]
        case OFFLINE:
            return state.filter(item=>item !== action.payload)
        default:
            return state
    }
}