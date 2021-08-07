import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getMessage } from '../../_actions/messageActions'
import LeftSide from './LeftSide'
import RightSide from './RightSide'

function Message(props) {
    const id =  props.match.params.id

    return (
        <div className="message d-flex">
            <div className="col-md-4 border-right px-0 left-mess">
                <LeftSide id={id}/>
            </div>

            <div className="col-md-8 px-0">
                <RightSide id={id}/>
            </div>

        </div>
    )
}

export default Message
