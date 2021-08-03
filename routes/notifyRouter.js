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
        return res.json({notify})

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

module.exports = notifyRouter
