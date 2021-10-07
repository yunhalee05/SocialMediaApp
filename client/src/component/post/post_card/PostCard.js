import CardHeader from './CardHeader'
import CardBody from './CardBody'
import CardFooter from './CardFooter'
import Comments from './Comments'
import InputComment from './InputComment'

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
