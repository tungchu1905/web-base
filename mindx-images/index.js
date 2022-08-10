require('dotenv').config()
const express = require('express');
const postRouter = require('./modules/post/post.router');
const authRouter = require('./modules/auth/auth.router');
const uploadRouter = require('./modules/upload/upload.router')
const commentRouter = require('./modules/comment/comment.router');
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.connect(process.env.MONGODB_URI, err => {
    if (err) {
        return console.log('DB connect err', err)
    }
    console.log('DB connect successfully')
})
const app = express();
app.use(express.json());
// express.json() la 1 ham 
app.use(express.static('uploads'))
app.use(cors())
app.use((req, res, next) => {
    console.log('Time', Date.now(), req.method);
    next();
})

app.get('/', (req, res)=>{
    res.send('<h1>Xin chao web</h1>')
})

// tat ca http request nao co tien to la /api/posts thi di vap post router
//POST
app.use('/api/posts', postRouter);
//COMMENT
app.use('/api/comment', commentRouter);
//USER
app.use('/api/auth', authRouter)
//UPLOAD
app.use('/api/upload', uploadRouter)
// fail page
app.use('*', (req, res) => {
    res.send({ message: '404 not found' })
})

// bat toan bo cac middleware ma goi ham next(error)
app.use(function (err, req, res, next) {
    // console.error(err.stack)
    res.status(err.status || 500).send({success: 0, message: err.message})
})

app.listen(process.env.PORT || 8080, (err) => {
    if (err) {
        return console('Server Error'
        )
    }
    console.log('Server Started')
})
// 42p
