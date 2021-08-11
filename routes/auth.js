const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const verifyToken = require('../middleware/verifyToken')

router.get('/',verifyToken,async(req,res)=>{
   try{
       const user = await User.findOne({_id:req.userId})
       if(!user)
        return res.json({
            success:false,
            message:`can't found username`
        })
        return res.json({
            success:true,
            message:'successful',user
        })
   }catch(error){
    console.log(error)
    return res.json({
        success:false,
        message:`Interval server`
    })
   }
})

router.post('/login',async (req,res)=>{
    const {username} = req.body
    try{
        if(!username){
            return res.status(400).json({
                success:false,
                message:'username not exits!!'
            })
        }
        const user =await  User.findOne({username})
        if(user){

            const accessToken = jwt.sign({userId:user._id},process.env.ACCESS_TOKEN_SECRET)
            return res.json({
                success:true,
                message:'Login success',
                accessToken
            })
        }
        return res.status(400).json({
            success:false,
            message: `can't found user`
        })

    }catch(error){
        console.log(error)
        return res.status(403).json({
            success:false,
            message:`Can't Login!!`
        })
    }
})


router.post('/register',async (req,res)=>{
    const {username} = req.body
    try{
    const user = await User.findOne({username})
    if(user){
        return res.status(400).json({
            success:false,
            message: 'username has exist'
        })
    }
    const newUser = new User({username})
    newUser.save()
    const accessToken = jwt.sign({userId:newUser._id},process.env.ACCESS_TOKEN_SECRET)
    return res.json({
        success:true,
        message:'register successfully!!',
        accessToken
    })
    }catch(error){
        console.log(error)
        return res.status(403).json({
            success:false,
            message:`Can't Register!!`
        })
    }
})


module.exports = router