const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    idRoom:{
        type:Array
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('auths',UserSchema)