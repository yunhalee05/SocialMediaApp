const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const {User} = require('./models/User')
const app = express();

const cookieParser = require('cookie-parser')

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(()=>console.log('MongoDB connected.'))
.catch(err=> console.log(err))



app.get('/',(req, res)=>{
    res.send('hello world')
})


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use('/api/users', require('./routes/userRouter'))
app.use('/api/search', require('./routes/searchRouter'))


const port = process.env.port || 5000
app.listen(port, ()=> console.log(`Server is listening on port ${port}.`))