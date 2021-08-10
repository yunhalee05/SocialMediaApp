import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../component/Alert'
import Loading from '../component/Loading'
import { Link, useHistory } from 'react-router-dom'
import { register } from '../_actions/userActions'


function RegisterPage(props) {

    const redirect = props.location.search? props.location.search.split('=')[1]:"/"

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [gender, setGender] = useState('male')

    const [typePass, setTypePass] = useState(false)
    const [cftypePass, setCftypePass] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo, loading, error} = userLogin;
    const alert = useSelector(state => state.alert)

    const dispatch = useDispatch()

    useEffect(() => {
       if(userInfo){
           props.history.push(redirect)
       }
    }, [userInfo, props.history, redirect])


    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(register(fullname, username, email, password,confirmPassword, gender))

    }

    
    return (
        <div className="auth_page">
        {loading && <Loading></Loading>}
            <form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
                <h3 className="text-center mb-4" style={{backgroundColor:"#ffcd38"}}><strong>REGISTER</strong></h3>
                    <div>
                    <div className="form-group">
                        <label htmlFor="fullname">Full Name</label>
                        <input type="text" className="form-control" id="fullname" name="fullname"
                         onChange={e=>setFullname(e.target.value)} value={fullname} required/>
                        <small className="form-text text-danger">
                            {alert.fullname ? alert.fullname : ''}
                        </small>
                    </div>


                    <div className="form-group">
                        <label htmlFor="username">User Name</label>
                        <input type="text" className="form-control" id="username" name="username"
                         onChange={e=>setUsername(e.target.value)} value={username} required/>
                        <small className="form-text text-danger">
                            {alert.username ? alert.username : ''}
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" name="email"
                        aria-describedby="emailHelp" onChange={e=>setEmail(e.target.value)} value={email} required/>
                    
                        <small id="emailHelp" className="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small>
                        <small className="form-text text-danger">
                            {alert.email ? alert.email : ''}
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

                        <small className="form-text text-danger">
                        {alert.password ? alert.password : ''}
                        </small>

                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>

                        <div className="pass">
                            <input type={ cftypePass ? "text" : "password" } 
                            className="form-control" id="confirmPassword"
                            onChange={e=>setConfirmPassword(e.target.value)} value={confirmPassword} name="confirmPassword" required />

                            <small onClick={() => setCftypePass(!cftypePass)}>
                                {cftypePass ? 'Hide' : 'Show'}
                            </small>
                        </div>
                        <small className="form-text text-danger">
                            {alert.confirmPassword ? alert.confirmPassword : ''}
                        </small>

                    </div>

                    <div className="row justify-content-between mx-0 mb-1">
                        <label htmlFor="male">
                            Male: <input type="radio" id="male" name="gender"
                            value="male" defaultChecked onChange={e=>setGender(e.target.value)} />
                        </label>

                        <label htmlFor="female">
                            Female: <input type="radio" id="female" name="gender"
                            value="female" onChange={e=>setGender(e.target.value)} />
                        </label>

                        <label htmlFor="other">
                            Other: <input type="radio" id="other" name="gender"
                            value="other" onChange={e=>setGender(e.target.value)} />
                        </label>
                    </div>
                    
                    <button type="submit" className="btn btn-dark w-100">
                        Register
                    </button>

                    <p className="my-2">
                    <strong>Already have an account? <Link to="/login" style={{color: "crimson"}}>Login Now</Link></strong>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage
