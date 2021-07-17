const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const {User} = require('./models/User')
const app = express();
const path = require('path')

const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(()=>console.log('MongoDB connected.'))
.catch(err=> console.log(err))



app.get('/',(req, res)=>{
    res.send('hello world')
})


const __variableOfChoice = path.resolve();
app.use('/profileuploads', express.static(path.join(__variableOfChoice, '/profileuploads')))
app.use('/postuploads', express.static(path.join(__variableOfChoice, '/postuploads')))


app.use('/api/users', require('./routes/userRouter'))
app.use('/api/post', require('./routes/postRouter'))
app.use('/api/comment', require('./routes/commentRouter'))
app.use('/api/search', require('./routes/searchRouter'))
app.use('/api/postuploads', require('./routes/postUploadRouter'));




const port = process.env.port || 5000
app.listen(port, ()=> console.log(`Server is listening on port ${port}.`))