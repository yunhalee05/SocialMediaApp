import { STATUS } from "../_constants/globalConstants";

export const statusReducer  = (state=false, action)=>{
    switch(action.type){
        case STATUS:
            return action.payload
        default:
            return state
    }
}

