const express = require('express')
const {auth} = require('../middleware/auth')
const {Message} = require('../models/Message')
const {Conversation} = require('../models/Conversation')


const messageRouter = express.Router()

messageRouter.post('/', auth, async(req, res)=>{
    try{
        const {sender, recipient, text, media, call} = req.body

        if(!recipient || (!text.trim() && media.length===0 && !call))  return;

        const newConversation = await Conversation.findOneAndUpdate({
            $or:[
                {recipients:[sender, recipient]},
                {recipients:[recipient, sender]}
            ]
        },{
            recipients:[sender, recipient],
            text, media,call
        },{new:true, upsert:true})


        const newMessage = new Message({
            conversation:newConversation,
            sender,
            recipient,
            text,
            media,
            call
        })
        await newMessage.save()

        res.json({
            msg:'Create Success.'
        })

    }catch(err){
        return res.status(500).json({msg:err.message})
    }
})

messageRouter.get('/:id', auth, async(req, res)=>{
    try{

        const limit = req.query.limit || 9
        const page = req.query.page || 1

        const messages = await Message.find({
            $or:[
                {sender:req.user.id, recipient:req.params.id},
                {sender:req.params.id, recipient:req.user.id}
            ]
        }).sort('-createdAt')
            .limit(Number(page)* Number(limit))

        

        res.json({
            messages,
            result:messages.length
        })
    }catch(err){
        return res.status(500).json({msg:err.message})
    }
})

messageRouter.get('/', auth, async(req,res)=>{
    try{
        const conversations = await Conversation.find({
            recipients:req.user.id
        }).sort('-createdAt')
            .populate('recipients', 'avatar username fullname')

        
        res.json({
            conversations
        })
    }catch(err){
        return res.status(500).json({msg:err.message})
    }
})

messageRouter.delete('/:id', auth, async(req, res)=>{
    try{
        const deletedMessage = await Message.findOneAndDelete({_id:req.params.id, sender:req.user.id})

        res.json({deletedMessage})

    }catch(err){
        return res.status(500).json({msg:err.message})
    }
})

messageRouter.delete('/conversation/:id', auth , async(req, res)=>{
    try{
        const deletedConversation = await Conversation.findOneAndDelete({
            $or:[
                {recipients: [req.user.id, req.params.id]},
                {recipients: [req.params.id, req.user.id]}
            ]
        })

        await Message.deleteMany({conversation: deletedConversation._id})

        res.json({deletedConversation})

    }catch(err){
        return res.status(500).json({msg:err.message})
    }
})

module.exports = messageRouter
