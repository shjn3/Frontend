
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['Todo','In Progress','Complete']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}) 


module.exports = mongoose.model('todos',todoSchema)