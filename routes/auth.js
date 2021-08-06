const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const verifyToken = require('../middlewares/auth')

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get('/',verifyToken, async (req,res)=>{
	try{
		
		const user = await User.findById(req.userId).select('-password')
		if(!user){
			return res.status(400).json({
				 success: false,
				  message: 'User not found' 
				})
		}
		return res.json({success:true,user})
	}catch(error){
		res.status(500).json({
			success:false,
			message:'Internal server error!'
		})}
})
// @route post api/auth/register
// @desc register user
// @access Public

router.post('/register', async (req,res)=>{
	try{
		console.log(req.body)
		const {username,password} = req.body

		const user = await User.findOne({username})
		if(user){
			return res.json({ success: false, message: 'Username already taken' })
		}	
		const hashedPassword = await argon2.hash(password)
		const newUser = new User({username,password:hashedPassword})
		await newUser.save()

		const accessToken = jwt.sign(
			{userId:newUser._id},
			process.env.ACCESS_TOKEN_SECRET
			)

		res.json({success:true,
		message:'User created successfully',
		accessToken
		})
	}
	catch(error){
		res.status(500).json({
			success:false,
			message:'Internal server error!'

	})}
})
// @route POST api/auth/login
// @desc Login user
// @access Public

router.post('/login',async (req,res)=>{
	const {username,password} = req.body
 
	try{
		const user = await  User.findOne({username})
		if(!user){
			return res.json({ success: false, message: 'Incorrect username' })
		}
		const passwordValid = await argon2.verify(user.password, password)

		if(!passwordValid){
			return res.json({ 
						success: false,
						 message: 'Incorrect password'
			})
		}
		
		const accessToken = jwt.sign(
			{userId:user._id},
			process.env.ACCESS_TOKEN_SECRET
		)
		return res.json({
			success:true,
			message:'Login successfully',
			accessToken
		})
	}catch(error){
		console.log(error)
		res.status(500).json({
			success:false,
			message:'Internal server error!'
	})}
})

module.exports = router