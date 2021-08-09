import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { login } from '../_actions/userActions'
import Loading from '../component/Loading'
import Alert from '../component/Alert'


function LoginPage(props) {

    const redirect = props.location.search? props.location.search.split('=')[1]:"/home"
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [typePass, setTypePass] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo, loading, error} = userLogin;

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo])

    const dispatch = useDispatch()

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(login(email, password))

    }
    return (
        <div className="auth_page">
            <div className="welcome">Welcome to Social Media App</div>
            <form onSubmit={handleSubmit}>
                <h3 className="text-center mb-4" style={{backgroundColor:"#ffcd38"}}><strong>LOGIN</strong></h3>

                    <div>
                    {loading && <Loading></Loading>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" name="email"
                        aria-describedby="emailHelp" onChange={e=>setEmail(e.target.value)} value={email} required/>
                        
                        <small id="emailHelp" className="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>

                        <div className="pass">
                            <input type={ typePass ? "text" : "password" } 
                            className="form-control" id="password"
                            onChange={e=>setPassword(e.target.value)} value={password} name="password" required />

                            <small onClick={() => setTypePass(!typePass)}>
                                {typePass ? 'Hide' : 'Show'}
                            </small>
                        </div>
                    
                    </div>
                    
                    <button type="submit" className="btn btn-dark w-100"
                    disabled={email && password ? false : true}>
                        Login
                    </button>

                    <p className="my-2">
                        <strong>You don't have an account? <Link to="/register" style={{color: "crimson"}}>Register Now</Link></strong>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default LoginPage
