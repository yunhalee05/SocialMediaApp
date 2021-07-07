import React from 'react'
import { useSelector } from 'react-redux'

function Avatar({src, size}) {
    const theme = useSelector(state => state.theme)
    return (
        <div>
            <img src={src} alt="avatar" className={size} style={{filter: `${theme ? 'invert(1)': 'invert(0)'}`}}/>
        </div>
    )
}

export default Avatar
