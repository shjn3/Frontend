require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const authRouter = require('./routes/auth')
const conversationRouter = require('./routes/conversation')
const messengerRouter = require('./routes/messenger')
const findFriendRouter =require('./routes/findFriend')

const cors = require('cors')
const app = express()
const port = 8080

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

app.use(cors())
app.use(express.json())

app.use('/api/auth',authRouter)
app.use('/api/conversation',conversationRouter)
app.use('/api/messenger',messengerRouter)
app.use('/api/findfriend',findFriendRouter)

app.listen(port,()=>console.log(`start server on port ${port}`))