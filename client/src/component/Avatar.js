import React from 'react'
import { useSelector } from 'react-redux'

function Avatar({src, size}) {
    return (
        <div>
            <img src={src} alt="avatar" className={size} />
        </div>
    )
}

export default Avatar
