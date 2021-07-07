const express = require('express')
const {User} = require('../models/User')
const {auth} = require('../middleware/auth')

const searchRouter = express.Router();

searchRouter.get('/',auth, async(req, res)=>{
    try{
        const users = await User.find({username:{$regex:req.query.username}})
                                .limit(10).select("fullname username avatar")
        res.send({users})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
})

module.exports = searchRouter