const express = require('express')

const router = express.Router()
const verifyToken = require('../middlewares/auth')
const Todo = require('../models/todo')

// @router GET /api/todo
// @des GET todo list
// @access private

router.get('/',verifyToken,async (req,res)=>{
    try{
        const todo = await Todo.find({user:req.userId})
        res.json({success:true,message:'Get data successfully!!',Todo: todo})
    }catch(error){
        console.log(error)
        res.json({success:false, message:`can't connected database!!`})
    }
})

// @router post /api/todo
// @des add todo list
// @access private
router.post('/',verifyToken,async (req,res)=>{
    const {title} = req.body
    if(!title)
        return res
                .status(400)
                .json({
                    success:false,
                    message:'Title is required'
                })
    try{
        
        const newTodo = new Todo({
            title:title,
            status:'Todo',
            user:req.userId
        })
        await newTodo.save()

        res.json({
            success:true,
            message:`Add todo successfully`,
            Todo:newTodo
        })
    }
    catch(error){
        console.log(error)  
        res.status(400).json({
            success:false,
            message:`Add todo unsuccessfully`
        })
    }   
})

// @router put /api/todo
// @des update todo
// @access private

router.put('/',verifyToken,async(req,res)=>{
    const {id,title,status} = req.body
    try{
        let updateTodo = {
            title,
            status
        }
        const todoUpdate ={_id: id,user:req.userId}

        updatedTodo = await Todo.findOneAndUpdate(
            todoUpdate,
            updateTodo,
            {new:true}
        )
        res.json({
            success:true,
            message:'Excellent progress!',
            todo: updatedTodo
        })

    }catch(error){
        console.log(error)
		res.json({
            success: false,
            message: 'Internal server error',
        })
    }
})
// @router delete /api/todo
// @des delete todo 
// @access private
router.delete('/:id',verifyToken,async(req,res)=>{
    try{

        const todoDelete ={_id: req.params.id,user:req.userId}

        updatedTodo = await Todo.findOneAndDelete(todoDelete)
        res.json({
            success:true,
            message:'excellent delete!',
            userId: req.params.id
        })

    }catch(error){
        console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error',userId:'' })
    }
})
module.exports = router