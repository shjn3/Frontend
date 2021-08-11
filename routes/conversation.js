const router = require('express').Router()

const Conversation = require('../models/conversation')

//add New Convesation

router.post('/',async(req,res)=>{
    const {sendId, receiveId} = req.body
    try{
        const newConversation = new Conversation({
            members:[sendId,receiveId]
        })
        await newConversation.save()
        return res.status(200).json(newConversation)

    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
})

//get conversation of a user

router.get('/:userId',async(req,res)=>{
    try{
        const conversation = await Conversation.find({
            members:{$in:[req.params.userId]},
        })
        res.status(200).json(conversation)
    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
})

//get conversation include two userId

router.get('/find/:firstUserId/:secondUserId',async (req,res)=>{
    try{
        const conversation = await Conversation.findOne({
            members:{$all:[req.params.firstUserId,req.params.secondUserId]}
        })
        return res.status(200).json(conversation)
    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
})

module.exports = router