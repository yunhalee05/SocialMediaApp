import React from 'react'
import {Link} from 'react-router-dom'

function PostThumb({posts, result}) {

    if(result ===0) return <h2 className="text-center text-danger">No Post</h2>

    return (
        <div className="post_thumb">
            {
                posts?.map(post=>(
                    <Link key={post._id} to={`/post/${post._id}`}>
                        <div className="post_thumb_display">
                            {
                                // console.log(post.images[0])
                                post.images[0]?.config.url.match(/video/i)
                                ? <video controls src={post.images[0]?.data} alt={post.images[0]?.data}></video>
                                : <img src={post.images[0]?.data} alt={post.images[0]?.data}></img>
                            }

                                
                            <div className="post_thumb_menu">
                                <i className="far fa-heart">{post.likes.length}</i>
                                <i className="far fa-comment">{post.comments.length}</i>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default PostThumb
