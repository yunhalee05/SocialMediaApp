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
                                post.images[0]?.data.match(/video/i)||post.images[0]?.data.match(/mp4/i)||post.images[0]?.data.match(/avi/i)||post.images[0]?.data.match(/mov/i)||post.images[0]?.data.match(/wmv/i)
                                ? <video controls src={post.images[0]?.data} alt={post.images[0]?.data}></video>
                                : <img src={post.images[0]?.data} alt={post.images[0]?.data}></img>
                            }

{/*                                 
                            <div className="post_thumb_menu ">
                                <span className="pr-3">
                                    <div><i className="far fa-heart"></i></div>
                                    <div>{post.likes.length}</div>
                                </span>

                                <span className="pl-3">
                                    <div><i className="far fa-comment"></i></div>
                                    <div>{post.comments.length}</div>
                                </span>

                            </div> */}
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default PostThumb
