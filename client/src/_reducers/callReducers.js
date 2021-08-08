import { CALL, PEER } from "../_constants/callConstants"

export const callReducer = (state=null, action)=>{
    switch(action.type){
        case CALL:
            return action.payload

        default:
            return state
    }
}

export const peerReducer = (state=null, action)=>{
    switch(action.type){
        case PEER:
            return action.payload

        default:
            return state
    }
}