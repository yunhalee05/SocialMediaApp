const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar:{
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png'
    },
    role: {type: String, default: 'user'},
    gender: {type: String, default: 'male'},
    mobile: {type: String, default: ''},
    address: {type: String, default: ''},
    story: {
        type: String, 
        default: '',
        maxlength: 200
    },
    website: {type: String, default: ''},
    followers: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    following: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    saved: [{type: mongoose.Types.ObjectId, ref: 'Post'}],
    social:{
        type:String,
        default:'',
        required:false
    }

}, {
    timestamps: true
})

// userSchema.pre('save', function(next){
//     var user = this;
//     if(user.isModified('password')){
//         bcrypt.genSalt(saltRounds, function(err, salt){
//             if(err) return next(err);
//             bcrypt.hash(user.password, salt, function(err, hash){
//                 if(err) return next(err)
//                 user.password  = hash;
//                 next()
//             })
//         })
//     }else{
//         next()
//     }
// })


// userSchema.statics.findByToken = function(token, cb){
//     var user = this;
//     jwt.verify(token, 'secret', function(err, decode){
//         jwt.verify({"_id":decode, "token":token}, function(err, user){
//             if(err) return cb(err)
//             cb(null, user);
//         })
//     })
// }

const User = mongoose.model('User', userSchema)
module.exports = {User}