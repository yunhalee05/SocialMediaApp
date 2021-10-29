import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { socialLogin } from '../_actions/userActions'

function SocialLogin(props) {

    const socialName = props.match.params.social
    var params = props.history.location.hash.substring(1)

    console.log(params)
    console.log(socialName)

    const dispatch = useDispatch()
    
    useEffect(() => {
        const access_token = getAccessToken(params)
        getData(access_token)

    }, [params])

    const getData = async(access_token) =>{
        const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?&access_token=${access_token}`)
        console.log(res)
        dispatch(socialLogin(res.data.name, res.data.given_name+res.data.id.substring(0,5), res.data.email, access_token, res.data.picture,socialName))
    }

    const getAccessToken = (params)=>{
        params = params.split("&")
        var param = new Array()
        var key, value
        for(var i = 0; i<params.length; i++){
            key = params[i].split("=")[0]
            value = params[i].split("=")[1]
            param[key]=value
        }

        return param["access_token"]
    }
    return (
        <div>
            
        </div>
    )
}

export default SocialLogin
