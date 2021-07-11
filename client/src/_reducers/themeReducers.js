import { THEME } from "../_constants/globalConstants";

export const themeReducer = (state=false, action)=>{
    switch(action.type){
        case THEME:
            return action.payload;
        default:
            return state
    }
}

