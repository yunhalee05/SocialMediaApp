import { THEME } from "../_constants/globalConstants";

const themeReducer = (state=false, action)=>{
    switch(action.type){
        case THEME:
            return action.payload;
        default:
            return state
    }
}

export default themeReducer