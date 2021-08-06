import { createSlice} from "@reduxjs/toolkit";

import { getTodos,addTodos,updateTodos,deleteTodos } from "../actions/todoAction";


const todosSlice = createSlice({
    name:'todos',
    initialState:{
        isError:false,
        messageError:'',
        listTodo:[],
        todo:null,
        isShowAddModal:false,
        isShowEditModal:false
    },
    reducers:{
        findTodo: (state,action)=>{
            state.todo = action.payload.ftodo
            state.isShowEditModal=action.payload.isShowEditModal
        },
        setShowAddModal: (state,action)=>{
            state.isShowAddModal=action.payload
        },
        setShowEditModal: (state,action)=>{
            state.isShowEditModal=action.payload
            state.todo=null
        }
    },
    extraReducers:{
        [getTodos.fulfilled]:(state,action)=>{
            const {listTodo,isError,messageError} = action.payload
            state.isError = isError
            state.messageError = messageError
            state.listTodo=listTodo.map((todo)=>todo)
        },
        [addTodos.fulfilled]:(state,action)=>{
            const {newTodo,isError,messageError} = action.payload
            state.isShowAddModal = !state.isShowAddModal
            state.isError=isError
            state.messageError=messageError
            state.listTodo.push(newTodo)
        },
        [updateTodos.fulfilled]:(state,action)=>{
            const {update,isError,messageError} = action.payload
            state.isShowEditModal=!state.isShowEditModal
            state.todo=null
            state.isError = isError
            state.messageError = messageError
            state.listTodo = state.listTodo.map((todo)=>{
                if(todo._id === update._id){
                    return update
                }
                return todo
            })
        },
        [deleteTodos.fulfilled]:(state,action)=>{
            const {userId,isError,messageError} = action.payload
            state.isError = isError
            state.messageError = messageError
            state.listTodo = state.listTodo.filter(todo=>todo._id!==userId)
        }
    }
})


const todosReducer = todosSlice.reducer

export const {findTodo,setShowAddModal,setShowEditModal} = todosSlice.actions
export const todosSelector = state=>state.todos


export default todosReducer