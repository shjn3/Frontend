const express = require('express')
const router = express.Router()
const Messenger = require('../models/messenger')


//Get message of a user
router.get('/:conversationId',async (req,res)=>{
    try{
        const messengers = await Messenger.find({conversationId:req.params.conversationId})
        return res.status(200).json(messengers)
    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
})

//POST message of a user
router.post('/',async (req,res)=>{
    const newMessenger = new Messenger(req.body)
    try{
        const saveMessenger = await newMessenger.save()
        return res.status(200).json(saveMessenger)
    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
})


module.exports = router