import {Route, Redirect} from 'react-router-dom'

const PrivateRouter = (props)=>{
    const userInfo = localStorage.getItem('userInfo')
    return userInfo? <Route {...props} /> : <Redirect to="/"/>

}

export default PrivateRouter