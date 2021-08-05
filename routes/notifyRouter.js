const express = require('express')
const {auth} = require('../middleware/auth')
const { Notify } = require('../models/Notify')


const notifyRouter = express.Router()

notifyRouter.post('/', auth, async(req, res)=>{
    try{
        const {id, recipients, url, text, content, image}= req.body.body

        if(recipients.includes(req.user.id.toString())) return ;

        const notify= new Notify({id, recipients, url, text, content, image, user:req.user.id})

        await notify.save()
        const newnotify = await Notify.findOne({id:id, url:url}).sort('-createdAt')
                                                                .populate('user', 'avatar username')

        return res.json({newnotify})

    }catch(err){
        return res.status(500).json({message:err.message})
    }
})

notifyRouter.delete('/:id', auth, async(req, res)=>{
    try{
        const notify = await Notify.findOneAndDelete({id:req.params.id, url:req.query.url})

        return res.json({notify})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
})

notifyRouter.get('/', auth, async(req, res)=>{
    try{
        const notifies = await Notify.find({recipients:req.user.id})
                                        .sort('-createdAt')
                                        .populate('user', 'avatar username')
        return res.send({notifies})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
})

notifyRouter.patch('/isReadNotify/:id', auth, async(req, res)=>{
    try{
        const updatedNotify = await Notify.findOneAndUpdate({_id:req.params.id}, {
            isRead:true
        },{new:true}).sort('-createdAt')
                    .populate('user', 'avatar username')
                    
        return res.json({updatedNotify})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
})

notifyRouter.delete('/', auth, async(req,res)=>{
    try{
        const notifies = await Notify.deleteMany({recipients:req.user.id})
        return res.json({notifies})

    }catch(err){
        return res.status(500).json({message:err.message})
    }

})

module.exports = notifyRouter
