require('dotenv').config()
const express = require('express')
const multer =  require('multer')
const mongoose = require('mongoose')

const authRouter = require('./routes/auth')
const todoRouter = require('./routes/todo')
const uploadRouter = require('./routes/upload')
const cors = require('cors')

const connectDB = async ()=>{
    try{
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@analytic.gabed.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
			{
				useCreateIndex: true,
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
			}
        )
        console.log('MongoDB Connected!')
    }catch(error){
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const app = express()
const post = 8080

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use('/api/auth',authRouter)
app.use('/api/todo',todoRouter)
app.use('/api/upload',uploadRouter)


app.listen(post,()=>console.log(`start server on port $(post)`))