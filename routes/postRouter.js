const express = require('express')
const {Post} = require('../models/Post')
const {auth} = require('../middleware/auth')
const {User} = require('../models/User')
const {Comment} = require('../models/Comment')



const postRouter = express.Router()

postRouter.post('/', auth,  async(req, res)=>{
    // console.log(req.body)
    try{
        const newPost = new Post({'content':req.body.content, 'images':req.body.images,'user':req.body.userId})

        const user = await User.findOne({_id:req.user.id})
        await newPost.save()

        res.send({
            newPost:{
                ...newPost._doc,
                user
            }
        })

    }catch(err){
        return res.status(500).json({message:err.message})
    }
})

postRouter.get('/', auth, async(req, res)=>{
    try{

        const page = req.query.page || 1
        const limit = req.query.limit || 9


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
                                    options:{sort:'-createdAt'}
                                })
                                .skip(Number(page-1)*Number(limit))
                                .limit(Number(limit))
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
        const updatedPost = await Post.findOneAndUpdate({_id:req.params.id},{'content':req.body.content, 'images':req.body.images}, {new:true})
                                    .populate("user likes", "avatar username fullname")
                                    .populate({
                                        path:"comments",
                                        populate:{
                                            path:"user likes",
                                            select:"-password"
                                        },
                                        options:{sort:'-createdAt'}

                                    })


        res.send({updatedPost})

    }catch(err){
        return res.status(500).json({message:err.message})
    }
})

postRouter.delete('/:id', auth, async(req, res)=>{
    try{
        const deletedpost = await Post.findOneAndDelete({_id:req.params.id, user:req.user.id})
        await Comment.deleteMany({postId: deletedpost._id})

        const user = await User.findOne({_id:req.user.id})

        res.json({
            deletedpost:{
                ...deletedpost._doc,
                user
            }
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
        },{new:true})   .sort('-createdAt')
                        .populate("user likes", "avatar username fullname followers following")
                        .populate({
                            path:"comments",
                            populate:{
                                path:"user likes",
                                select:"-password"
                            },
                            // options:{sort:'-createdAt'}

                        })


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
        },{new:true})   .sort('-createdAt')
                        .populate("user likes", "avatar username fullname followers following")
                        .populate({
                            path:"comments",
                            populate:{
                                path:"user likes",
                                select:"-password"
                            },
                            // options:{sort:'-createdAt'}

                        })

        if(!unlikedpost) return res.status(400).json({msg:'This post does not exist.'})

        res.json({
            unlikedpost
        })

    }catch(err){
        return res.status(500).json({message:err.message})
    }
} )

postRouter.get('/user/:id', auth, async(req, res)=>{
    try{
        const posts = await Post.find({user: req.params.id})
                                .sort("-createdAt")
                                .populate("user likes", "avatar username fullname followers following")
                                .populate({
                                    path:"comments",
                                    populate:{
                                        path:"user likes",
                                        select:"-password"
                                    },
                                    // options:{sort:'-createdAt'}

                                })

        res.json({posts})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
})

postRouter.get('/:id', auth, async(req, res)=>{


    try{
        const post = await Post.findById(req.params.id)
                                .sort('-createdAt')
                                .populate("user likes", "avatar username fullname followers following")
                                .populate({
                                    path:"comments",
                                    populate:{
                                        path:"user likes",
                                        select:"-password"
                                    },
                                    // options:{sort:'-createdAt'}

                                })
        if(!post) return res.status(400).json({msg:"This post does not exist."})

        res.json({post})

    }catch(err){
        return res.status(500).json({message:err.message})
    }
    
})

postRouter.patch('/save/:id', auth, async(req, res)=>{
    try{
        const user = await User.find({_id:req.user.id, saved:req.params.id})
        if(user.length>0) return res.status(400).json({msg:"You already saved this post."})

        const save = await User.findOneAndUpdate({_id:req.user.id},{
            $push:{saved:req.params.id}
        }, {new:true})

        if(!save) return res.status(400).json({msg:'This post does not exist.'})

        res.json({save})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
})

postRouter.patch('/unsave/:id', auth, async(req, res)=>{
    try{
        const unsave = await User.findOneAndUpdate({_id:req.user.id},{
            $pull:{saved:req.params.id}
        }, {new:true})

        if(!unsave) return res.status(400).json({msg:'This post does not exist.'})

        res.json({unsave})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
})

postRouter.get('/profile/savedposts', auth, async(req, res)=>{
    try{
        const user = await User.findById({_id:req.user.id})

        const limit = req.query.limit ||9

        const savedposts = await Post.find({
            _id:{$in:user.saved}
        }).limit(Number(limit)).sort('-createdAt')

        // console.log(savedposts)

        res.json({savedposts, result:savedposts.length})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
})

module.exports = postRouter

