import React from 'react'

function LIkeButton({isLike, handleLike}) {
    
    return (
        <>
{            
}            {
                isLike
                ? <i className="fas fa-heart" onClick={handleLike} ></i>
                : <i className="far fa-heart" onClick={handleLike}></i>

            }
        </>
    )
}

export default LIkeButton
