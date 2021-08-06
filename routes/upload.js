const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')

const upload = multer({
    storage: multer.diskStorage({
        destination: function(req,file,callback){
            callback(null,'./public/uploads')
        },
        filename: function(req,file,callback){
            callback(null,file.fieldname+'-'+Date.now())
        }
    })
}) 
const User = require('../models/user')
const verifyToken = require('../middlewares/auth')

router.post('/',upload.single('avatar'),verifyToken, async(req,res)=>{

    try{
        let updateProfile = {_id:req.userId}
        let path = req.file.path.split('\\').slice(1).join('/')
        path = `http://localhost:8080/`+ path
        const user = await User.findOne({_id:req.userId})
        let currentAvatar = './public/'+user.avatar.slice(22)

        updateProfile = await User.findOneAndUpdate(
            updateProfile,
            {
                avatar:path
            },
            {new:true}
        )
        if(updateProfile){
        if(currentAvatar !=='./public/uploads/cat'){
             await fs.unlink(currentAvatar,()=>console.log('delete File success'))
        }
        return res.json({
                success:true,
                message:'success update Profile',
                path:updateProfile.avatar
        })
    }
        return res.json({
            success:false,
            message:"Can't update avatar!!"
        })
    }catch(error){
        console.log(error)
       return res.status(500).json({
            success:false,
            message:"Can't connect database!!"
        })
    }
})



module.exports = router