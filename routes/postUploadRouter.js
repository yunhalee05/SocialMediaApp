const multer = require('multer')
const express = require('express');
const { auth } = require('../middleware/auth');

const postUploadRouter = express.Router();

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null, 'postuploads/')
    },
    filename(req,file,cb){
        cb(null, `${Date.now()}.jpg`);
    }
})

const postupload = multer({storage})

postUploadRouter.post('/',auth, postupload.single('image'), (req,res)=>{
    res.send(`/${req.file.path}`)
})

module.exports = postUploadRouter