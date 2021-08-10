import React from 'react'
import { useSelector } from 'react-redux'
import Alert from '../component/Alert'
import LeftSide from '../component/messages/LeftSide'
import Loading from '../component/Loading'

function Message(props) {
    const userLogin = useSelector(state => state.userLogin)
    const userInfo = userLogin

    if(!userInfo){
        props.history.push('/login')
    }
    const message = useSelector(state => state.message)
    return (
        <div>
            {
                message.error
                && <Alert variant="danger">{message.error}</Alert>
            }
            {
                message.loading
                && <Loading></Loading>
            }
            <div className="message d-flex">
                <div className="col-md-4 border-right px-0 left-mess">
                    <LeftSide/>
                </div>
                <div className="col-md-8 px-0 right_mess">
                    <div className="d-flex justify-content-center align-items-center flex-column h-100">
                        <i className="fab fa-facebook-messenger text-primary" style={{fontSize:'5rem'}}></i>
                        <h4><strong>Messenger</strong></h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message
