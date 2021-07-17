const express = require('express')
const {auth} = require('../middleware/auth')
const { Post } = require('../models/Post')
const {Comment} = require('../models/Comment')


const commentRouter = express.Router()

commentRouter.post('/', auth, async(req, res)=>{
    console.log(req.body)

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

        console.log(newcomment)
        await Post.findOneAndUpdate({_id:req.body.postId}, {
            $push:{comments:newcomment._id}
        }, {new:true})

        await newcomment.save()

        res.json({newcomment})

    }catch(err){
        return res.status(500).json({message:err.message})
    }
})
module.exports = commentRouter
