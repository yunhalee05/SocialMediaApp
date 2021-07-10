import axios from "axios"
import { CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS } from "../_constants/postConstants"

export const createPost = ({content, Images})=> async(dispatch, getState)=>{
    const {userLogin:{userInfo}} = getState()
    dispatch({
        type:CREATE_POST_REQUEST,
        payload:{loading:true}
    })
    try{
        let imgArr = [];
        if(Images.length>0){
            for(const item of Images){
                const bodyFormData = new FormData()
                if(item.camera){
                    bodyFormData.append("image", item.camera)
                }else{
                    bodyFormData.append("image", item)
                }
                const data = await axios.post('/api/postuploads', bodyFormData,{
                    headers:{'Content-Type' : 'multipart/form-data', authorization:`Bearer ${userInfo.token}`}
                })
                imgArr.push(data)
            }
        }
        const res = await axios.post('/api/post', {content, images:imgArr, userId:userInfo.user._id,user:userInfo.user},{
            headers:{authorization:`Bearer ${userInfo.token}`}
        })
        dispatch({
            type:CREATE_POST_SUCCESS,
            payload:res.data.newPost
        })

    }catch(error){
        dispatch({
            type:CREATE_POST_FAIL,
            payload:                
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }

}