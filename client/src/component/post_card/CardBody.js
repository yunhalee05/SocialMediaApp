import React, { useState } from 'react'
import Carousel from '../Carousel'

function CardBody({post}) {

    const [readMore, setReadMore] = useState(false)
    return (
        <div className="card_body">
            {
                post.images.length>0 && <Carousel images={post.images}  id={post._id}/>
            }
            <div className="card_body-content">
                {
                    post.content.length>0 &&<strong className="mr-3">{post.user.username}</strong>
                }
                <span>
                    {
                        post.content.length<60
                        ? post.content
                        : readMore? post.content + ' ' : post.content.slice(0,60) + '.....'
                    }
                </span>
                {
                    post.content.length >60 &&
                    <span className="readMore" onClick={()=>setReadMore(!readMore)}>
                        {readMore? 'Hide content' : 'Read more'}
                    </span>
                }
            </div>
        </div>
    )
}

export default CardBody
