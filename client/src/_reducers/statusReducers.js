import { EDITSTATUS, STATUS } from "../_constants/globalConstants";

export const statusReducer  = (state=false, action)=>{
    switch(action.type){
        case STATUS:
            return action.payload
        default:
            return state
    }
}

export const editstatusReducer  = (state={}, action)=>{
    switch(action.type){
        case EDITSTATUS:
            return action.payload
        default:
            return state
    }
}

