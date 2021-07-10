const express = require('express')
const {Post} = require('../models/Post')
const {auth} = require('../middleware/auth')


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

module.exports = postRouter

