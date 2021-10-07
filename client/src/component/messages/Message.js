import React from 'react'
import { useSelector } from 'react-redux'
import Alert from '../common/Alert'
import Loading from '../common/Loading'
import LeftSide from './LeftSide'
import RightSide from './RightSide'

function Message(props) {
    const id =  props.match.params.id

    const message = useSelector(state => state.message)

    return (
        <div style={{padding:"2rem"}}>
            {
                message.error
                &&<Alert variant="danger">{message.error}</Alert>
            }
            {
                message.loading
                && <Loading></Loading>
            }
            
            <div className="message d-flex">
                <div className="col-md-4 border-right px-0 left-mess">
                    <LeftSide id={id}/>
                </div>

                <div className="col-md-8 px-0">
                    <RightSide id={id}/>
                </div>

            </div>
        </div>
    )
}

export default Message
