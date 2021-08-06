
import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import { apiUrl } from './Constant'



// @des Get list todos
export const getTodos = createAsyncThunk('todos/getTodos',async ()=>{
    
    try{
        const response = await axios.get(`${apiUrl}/todo`)
        if (response.data.success){
            return {
                listTodo: response.data.Todo,
                isError: false,
                messageError: response.data.message
            }
        }
        return {
            listTodo: [],
            isError:true,
            messageError:response.data.message
        }
    }catch(error){
        console.log(error)
        return {
            listTodo: [],
            isError:true,
            messageError: 'Your Internet was interrupt!!'
        }
    }
})
// @desc add a todo for list todo
export const addTodos = createAsyncThunk('todos/addTodos',async title=>{
    try{
        const response = await axios.post(`${apiUrl}/todo`,{title})
        if(response.data.success){
            return{
                newTodo: response.data.Todo,
                isError: false,
                messageError:response.data.message
            }
        }
        return {
            newTodo: {},
            isError: true,
            messageError:response.data.message
        }

    }catch(error){
        console.log(error)
        return {
            newTodo: {},
            isError: true,
            messageError: 'Your Internet was interrupt!!'
        }
    }
})

//@desc update a todo
export const updateTodos = createAsyncThunk('todos/updateTodos',async updateTodo=>{
    try{
        const response = await axios.put(`${apiUrl}/todo`,updateTodo)
        if(response.data.success){
            return {
                update: response.data.todo,
                isError: false,
                messageError:response.data.message
            }
        }
        return {
            update: {_id:''},
            isError: true,
            messageError:response.data.message
        }
    }catch(error){
        console.log(error)
    return {
        update:{_id:''},
        isError:true,
        messageError:'Your Internet was interrupt!!'

        }
    }
})

//@desc delete a todo
export const deleteTodos = createAsyncThunk('todos/deleteTodos',async id=>{
    try{
        const response = await axios.delete(`${apiUrl}/todo/${id}`)
        if(response.data.success){
            return{
                userId:response.data.userId,
                isError:false,
                messageError:response.data.messageError
            }
        }
        return{
            userId:response.data.userId,
            isError:true,
            messageError:response.data.messageError
        }
    }catch(error){
        console.log(error)
        return {
            userId:'',
            isError:true,
            messageError:'Your Internet was interrupt!!'
        }
    }
})