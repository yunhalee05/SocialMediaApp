import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { socialLogin } from '../_actions/userActions'
import {KAKAO_TOKEN_URL} from '../env'

function SocialLogin(props) {

    const socialName = props.match.params.social
    var params = socialName === "google" ? props.history.location.hash.substring(1) : socialName === "kakao" ? props.history.location.search.substring(1) :props.history.location

    console.log(props)
    console.log(params)
    console.log(socialName)

    const dispatch = useDispatch()
    
    useEffect(() => {
        getAccessToken(params)
    }, [params])

    const getAccessToken = async(params)=>{
        if(socialName === "google"){    
            params = params.split("&")
            var param = new Array()
            var key, value
            for(var i = 0; i<params.length; i++){
                key = params[i].split("=")[0]
                value = params[i].split("=")[1]
                param[key]=value
            }

            dispatch(socialLogin(socialName, param["access_token"]))
             
        }else if(socialName === "kakao"){
            await axios.post(KAKAO_TOKEN_URL+params.substring(5))
                        .then(res=>{
                            dispatch(socialLogin(socialName, res.data.access_token))                            
                        })
            
        }
    }
    return (
        <div>
            
        </div>
    )
}

export default SocialLogin
