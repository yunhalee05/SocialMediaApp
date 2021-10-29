import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { login } from '../_actions/userActions'
import Loading from '../component/common/Loading'
import Alert from '../component/common/Alert'
import logo from '../images/logo.png'
import {GOOGLE_AUTH_URL, KAKAO_AUTH_URL, NAVER_AUTH_URL} from '../env.js'
import google from '../images/google.jpg'
import naver from '../images/naver.png'
import kakao from '../images/kakao.jpg'


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
            <form onSubmit={handleSubmit} style={{marginTop:"5rem"}}>
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

                    <div className="auth_social_buttons">
                        <button className="auth_social_button" style={{backgroundColor:"#3266cf"}}>
                            <a href={GOOGLE_AUTH_URL}>
                                <div style={{color:"white"}}>
                                    Continue with GOOGLE
                                </div>
                                <div className="auth_social_button_image">
                                    <img src={google} alt="" />
                                </div>
                            </a>
                        </button>
                        <button className="auth_social_button" style={{backgroundColor:"#F5DA0C"}}>
                            <a href={KAKAO_AUTH_URL}>
                                <div style={{color:"#2E1413"}}>
                                    Continue with KAKAO
                                </div>
                                <div className="auth_social_button_image" style={{border:"2px solid #2E1413"}}>
                                    <img src={kakao} alt="" />
                                </div>
                            </a>
                        </button>
                        <button className="auth_social_button" style={{backgroundColor:"#1AC049"}}>
                            <a href={NAVER_AUTH_URL} style={{color:"white"}}>
                                <div>
                                    Continue with NAVER
                                </div>
                                <div className="auth_social_button_image" style={{border:"2px solid white"}}>
                                    <img src={naver} alt="" />
                                </div>
                            </a>
                        </button>
                    </div>

                    <p className="my-2">
                        <strong>You don't have an account? <Link to="/register" style={{color: "crimson"}}>Register Now</Link></strong>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default LoginPage
