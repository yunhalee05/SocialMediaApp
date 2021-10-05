const express = require('express')
const {Post} = require('../models/Post')
const {auth} = require('../middleware/auth')
const { User } = require('../models/User')



const discoverRouter = express.Router()

discoverRouter.get('/', auth, async(req, res)=>{
    try{

        const user = await User.findOne({_id:req.user.id})
        const newArr=[...user.following, req.user.id]

        const page = req.query.page || 1;
        const limit = req.query.limit || 9;

        const posts= await Post.aggregate([
            {$match: {user:{$nin: newArr}}},
            // {$sample: {size:Number(num)}},
            {$skip: Number(page-1)*Number(limit)},
            {$limit: Number(limit)},
        ])

        return res.json({
            result:posts.length,
            posts
        })
    }catch(err){
        return res.status(500).json({message:err.message})
    }
    
})
module.exports = discoverRouter

