import { SOCIAL_LOGIN_FAIL, SOCIAL_LOGIN_REQUEST, SOCIAL_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_LOGOUT, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS} from "../_constants/userConstants";
import axios from 'axios'
import { ALERT } from "../_constants/globalConstants";

export const login = (email, password)=>async (dispatch)=>{
    dispatch({
        type:USER_LOGIN_REQUEST
    })

    try{
        const {data} = await axios.post('/api/users/login',{email, password});

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))

    }catch(error){
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

    }
}

export const logout = () =>(dispatch) =>{
    dispatch({
        type:USER_LOGIN_LOGOUT,
        payload:"User logout successfully."
    })
    localStorage.removeItem("userInfo")


}

export const register = (fullname, username, email, password,confirmPassword, gender) => async (dispatch)=>{
    const check = valid(fullname, username, email, password, confirmPassword)
    if(check.errLength>0)return dispatch({type:ALERT, payload:check.errMsg})

    dispatch({
        type:USER_REGISTER_REQUEST
    })
    try{
         await axios.post('/api/users/register', {fullname,username, email, password, gender})
        const {data} = await axios.post('/api/users/login',{email, password});

        // dispatch({type:ALERT, payload:{}})

        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data
        })

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))

    }catch(error){
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}



const valid = (fullname, username,email, password,confirmPassword)=>{
    const err={}

    if(!fullname) {
        err.fullname = "Please add your full name."
    }else if(fullname.length>25){
        err.fullname = "Full name is up to 25characters long."
    }

    if(!username){
        err.username = "Please add your user name."
    }else if(username.replace(/ /g, '').length>25){
        err.username = "User name is up to 25 characters long."
    }

    if(!email){
        err.email = "Please add your email."
    }else if(!validateEmail(email)){
        err.email = "Email format is incorrect."
    }

    if(!password){
        err.password = "Please add your password."
    }else if(password.length<6){
        err.password = "Password must be at least 6 characters."
    }
    
    if(password !== confirmPassword){
        err.confirmPassword = "Confirm password did not match."
    }

    return{
        errMsg:err,
        errLength:Object.keys(err).length
    }
}

const validateEmail = (email)=>{
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


export const socialLogin = (fullname, username, email, password, avatar, socialName) => async (dispatch)=>{

    console.log("social login")
    console.log(fullname, username, email, password)
    dispatch({
        type:SOCIAL_LOGIN_REQUEST
    })
    try{
        const {data} = await axios.post('/api/users/socialLogin', {fullname,username, email, password, avatar, socialName})

        dispatch({
            type:SOCIAL_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))

    }catch(error){
        dispatch({
            type:SOCIAL_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

