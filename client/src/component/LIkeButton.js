import React from 'react'
import { useSelector } from 'react-redux'

function LIkeButton({isLike, handleLike}) {

    const theme = useSelector(state => state.theme)
    
    return (
        <>
{            console.log(isLike)
}            {
                isLike
                ? <i className="fas fa-heart" onClick={handleLike} style={{filter: theme? 'invert(1)': 'invert(0)'}}></i>
                : <i className="far fa-heart" onClick={handleLike}></i>

            }
        </>
    )
}

export default LIkeButton
