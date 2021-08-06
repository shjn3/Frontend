const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    avatar:{
        type:String,
        default:'http://localhost:8080/uploads/cat.png'
    },
    createAt:{
        type:Date,
        default: Date.now
    }

})

module.exports = mongoose.model('users',UserSchema)