const express = require('express')
const {User} = require('../models/User')
var bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const {generateToken} = require('../middleware/auth')

const userRouter = express.Router();

userRouter.post('/login', async (req, res)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        .populate("followers following", "avatar username fullname followers following")

        if(!user){
            return res.status(400).json({message:"This email does not exist."})
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch) return res.status(400).json({message:"Password is incorrect."})

        const token = generateToken(user)
        res.status(200)
            // .json({
            //     message:"login Success",
            //     token,
            //     user:{
            //         ...user._doc,
            //         password:''
            //     }
            // })
            .send({
                user:{
                    ...user._doc,
                    password:''
                },
                token
            })

    }catch(err){
        return res.status(500).json({message:err.message})
    }
})

userRouter.post('/register', async(req, res)=>{
    try{
        const {fullname, username, email, password, gender}=req.body
        let newUserName = username.toLowerCase().replace(/ /g, '')

        const user_name = await User.findOne({username:newUserName})
        if(user_name) return res.status(400).json({message:"This user name already exist."})

        const user_email = await User.findOne({email})
        if(user_email) return res.status(400).json({message:"This email already exist."})

        if(password.length<6) return res.status(400).json({message:"Password must be at least 6 characters."})
        const passwordHash = await bcrypt.hash(password,12)

        const newUser = new User({fullname, username:newUserName, email, password:passwordHash, gender})

        const createdUser = await newUser.save()

        res.status(200)
            // .json({
            // message:"Register Success",
            // token:generateToken({id:createdUser._id}),
            // user:{
            //     ...newUser._doc,
            //     passord:''
            // }
            // })
            .send({
                token:generateToken({id:createdUser._id}),
                user:{
                    ...newUser._doc,
                    password:''
                }
            })
 
    }catch(err){
        return res.status(500).json({message:err.message})
    }
})





module.exports = userRouter