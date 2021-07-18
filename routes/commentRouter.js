const express = require('express')
const {auth} = require('../middleware/auth')
const { Post } = require('../models/Post')
const {Comment} = require('../models/Comment')


const commentRouter = express.Router()

commentRouter.post('/', auth, async(req, res)=>{

    try{
        const post = await Post.findById(req.body.postId)
        if(!post) return res.status(400).json({msg:'This post does not exist.'})

        if(req.body.reply){
            const cm = await Comment.findById(req.body.reply)
            if(!cm) return res.status(400).json({msg:"This comment does not exist."})
        }

        const newcomment = new Comment({
            user:req.user.id, content: req.body.content, tag:req.body.tag, reply:req.body.reply, postUserId: req.body.postUserId, postId:req.body.postId
        })

        await Post.findOneAndUpdate({_id:req.body.postId}, {
            $push:{comments:newcomment._id}
        }, {new:true})

        await newcomment.save()

        res.json({newcomment})

    }catch(err){
        return res.status(500).json({message:err.message})
    }
})

commentRouter.patch('/:id', auth, async(req, res)=>{
    try{
        const comment = await Comment.findOneAndUpdate({_id:req.params.id, user:req.user.id}, {content: req.body.content})
        res.json({comment})

    }catch(err){
        return res.status(500).json({message:err.message})
    }

})

commentRouter.patch('/:id/like',auth, async(req, res)=>{
    try{
        const cm = await Comment.find({_id:req.params.id, likes:req.user.id})
        if(cm.length>0) return res.status(400).json({msg:"You already liked this comment."})

        const comment = await Comment.findOneAndUpdate({_id:req.params.id}, {
            $push:{likes:req.user.id}
        },{new:true})

        res.json({comment})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
})

commentRouter.patch('/:id/unlike', auth, async(req, res)=>{
    try{
        const comment = await Comment.findOneAndUpdate({_id:req.params.id}, {
            $pull:{likes:req.user.id}
        }, {new:true})
        
        res.json({comment})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
})
module.exports = commentRouter
