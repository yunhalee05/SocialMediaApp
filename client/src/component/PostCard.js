import CardHeader from './post_card/CardHeader'
import CardBody from './post_card/CardBody'
import CardFooter from './post_card/CardFooter'
import Comments from './post_card/Comments'
import InputComment from './post_card/InputComment'

import React from 'react'

function PostCard({post}) {
    return (
        <div className="card my-3 ">
            <CardHeader post = {post}/>
            <CardBody post = {post} />
            <CardFooter post = {post} />

            <Comments post = {post} />
            <InputComment post = {post} />

        </div>
    )
}

export default PostCard
