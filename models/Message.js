const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    conversation:{
        type:mongoose.Types.ObjectId,
        ref:'Conversation'
    },
    sender:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    recipient:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    text:'String',
    media:Array,
    call:Object

},{timestamps:true})

const Message = mongoose.model('Message', messageSchema)
module.exports  = {Message}
