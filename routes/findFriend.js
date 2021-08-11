const router = require('express').Router()

const User = require('../models/user')
router.get('/',async (req,res)=>{
    const userId = req.query.userId
    try{
        const user = await User.findOne({_id:userId}).select('username')
        return res.status(200).json(user)


    }catch(error){
        console.log(
            error
        )
        return res.status(500).json(error)

    }
})



module.exports = router
