const multer = require('multer')
const express = require('express');
const { auth } = require('../middleware/auth');

const postUploadRouter = express.Router();

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null, 'postuploads/')
    },
    filename(req,file,cb){
        cb(null, `${Date.now()}_${file.originalname}`);

    }
})

const postupload = multer({storage})

postUploadRouter.post('/',auth, postupload.single('file'), (req,res)=>{
    res.send(`/${req.file.path}`)
})

module.exports = postUploadRouter