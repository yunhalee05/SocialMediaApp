const express = require('express')
const {Post} = require('../models/Post')
const {auth} = require('../middleware/auth')
const {User} = require('../models/User')



const postRouter = express.Router()

postRouter.post('/', auth,  async(req, res)=>{
    // console.log(req.body)
    try{
        const newPost = new Post({'content':req.body.content, 'images':req.body.images,'user':req.body.userId})

        await newPost.save()

        res.send({newPost})

    }catch(err){
        return res.status(500).json({message:err.message})
    }
})

postRouter.get('/', auth, async(req, res)=>{
    try{

        const user = await User.findOne({_id:req.user.id})
        const posts = await Post.find({user:[...user.following, user._id]})
                                .sort('-createdAt')
                                .populate("user likes", "avatar username fullname followers following")
                                .populate({
                                    path:"comments",
                                    populate:{
                                        path:"user likes",
                                        select:"-password"
                                    },
                                    sort:'-createdAt'
                                })

        res.json({
            msg:'Get posts successfully',
            result:posts.length,
            posts
        })
    }catch(err){
        return res.status(500).json({message:err.message})
    }  
    
})

postRouter.patch('/:id', auth,  async(req, res)=>{
    // console.log(req.body)
    try{
        const updatedPost = await Post.findOneAndUpdate({_id:req.params.id},{'content':req.body.content, 'images':req.body.images})
                                    .populate("user likes", "avatar username fullname")
                                    .populate({
                                        path:"comments",
                                        populate:{
                                            path:"user likes",
                                            select:"-password"
                                        }
                                    })



        console.log(updatedPost)
        res.send({updatedPost})

    }catch(err){
        return res.status(500).json({message:err.message})
    }
})

postRouter.delete('/:id', auth, async(req, res)=>{
    try{
        const deletedpost = await Post.findOneAndDelete({_id:req.params.id, user:req.user.id})
        res.json({
            deletedpost
        })
    }catch(err){
        return res.status(500).json({message:err.message})
    }
})

postRouter.patch('/:id/like',auth, async(req,res)=>{
    try{
        const post = await Post.find({_id:req.params.id, likes:req.user.id})
        if(post.length>0) return res.status(400).json({msg:'You already liked this photo.'})

        const likedpost = await Post.findOneAndUpdate({_id:req.params.id},{
            $push:{likes:req.user.id}
        },{new:true})

        if(!likedpost) return res.status(400).json({msg:'This post does not exist.'})

        res.json({
            likedpost
        })

    }catch(err){
        return res.status(500).json({message:err.message})
    }
} )

postRouter.patch('/:id/unlike',auth, async(req,res)=>{
    try{
        const unlikedpost = await Post.findOneAndUpdate({_id:req.params.id},{
            $pull:{likes:req.user.id}
        },{new:true})

        if(!unlikedpost) return res.status(400).json({msg:'This post does not exist.'})

        res.json({
            unlikedpost
        })

    }catch(err){
        return res.status(500).json({message:err.message})
    }
} )

module.exports = postRouter

