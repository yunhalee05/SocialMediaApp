import React from 'react'

function Avatar({src, size}) {
    return (
        <div>
            <img src={src} alt="avatar" className={size} />
        </div>
    )
}

export default Avatar
