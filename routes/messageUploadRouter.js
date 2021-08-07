const multer = require('multer')
const express = require('express');
const { auth } = require('../middleware/auth');

const messageUploadRouter = express.Router();

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null, 'messageuploads/')
    },
    filename(req,file,cb){
        cb(null, `${Date.now()}_${file.originalname}`);

    }
})

const messageupload = multer({storage})

messageUploadRouter.post('/',auth, messageupload.single('file'), (req,res)=>{
    res.send(`/${req.file.path}`)
})

module.exports = messageUploadRouter