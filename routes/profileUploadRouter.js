const multer = require('multer')
const express = require('express');
const { auth } = require('../middleware/auth');

const profileUploadRouter = express.Router();

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null, 'profileuploads/')
    },
    filename(req,file,cb){
        cb(null, `${Date.now()}.jpg`);
    }
})

const profileupload = multer({storage})

profileUploadRouter.post('/',auth, profileupload.single('image'), (req,res)=>{
    res.send(`/${req.file.path}`)
})

module.exports = profileUploadRouter