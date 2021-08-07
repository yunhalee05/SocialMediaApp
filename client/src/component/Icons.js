import React from 'react'

function Icons({setContent, content}) {
    const reactions = [   
        '❤️', '😆', '😯', '😢', '😡', '👍', '👎', '😄',
        '😂', '😍', '😘', '😗', '😚', '😳', '😭', '😓',
        '😤', '🤤', '👻', '💀', '🤐', '😴', '😷', '😵',
        '😖', '😣', '😔', '😵‍💫'
    ]
    return (
       <div className="nav-item dropdown" style={{opacity:1}}>
            <span className="nav-link position-relative px-1" id="navbarDropdown"
            role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span style={{opacity:0.4}}>😄</span>
            </span>

            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <div className="reactions">
                    {
                        reactions.map(icon=>(
                            <span key={icon} onClick={(e)=>setContent(content+icon)}>
                                {icon}
                            </span>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Icons
