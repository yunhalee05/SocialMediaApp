const { SOCKET } = require("../_constants/globalConstants")


const socketReducer = (state = [], action)=>{
    switch(action.type){
        case SOCKET:
            return action.payload;
        default:
            return state;
    }
}


export default socketReducer