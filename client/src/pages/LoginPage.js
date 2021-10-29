import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { login } from '../_actions/userActions'
import Loading from '../component/common/Loading'
import Alert from '../component/common/Alert'
import logo from '../images/logo.png'
import {GOOGLE_AUTH_URL, KAKAO_AUTH_URL} from '../env.js'


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
            {loading && <Loading></Loading>}
            <div className="welcome">
                <img src={logo} alt="" />
            </div>
            <form onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}
                <h3 className="text-center mb-4" style={{backgroundColor:"#ffcd38"}}><strong>LOGIN</strong></h3>

                    <div>
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


                    <button>
                        <a href={GOOGLE_AUTH_URL}>Login to google</a>
                    </button>
                    <button>
                        <a href={KAKAO_AUTH_URL}>Login to kakao</a>
                    </button>
                    <button>

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
