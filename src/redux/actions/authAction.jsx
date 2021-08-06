import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import {apiUrl,LOCAL_STORAGE_TOKEN_NAME} from './Constant'


export const Logout = ()=>{
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
    setAuthToken(null)
}

const loadUser = async () =>{
    if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
        setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
    }
    try{
        const response = await axios.get(`${apiUrl}/auth`)
        return response.data
    }
    catch(error){
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        setAuthToken(null)
        return {
            success: false,
            message: 'Your connection was interrupted!!'
        }
    }
}

export const loadData = createAsyncThunk('auth/loadData',async ()=>{
    const data = await loadUser();

    if(data.success){
        return {
            authLoading: false,
            isAuthentication:true,
            user:data.user
        }
    }
    else
        return {
            authLoading: false,
            isAuthentication: false,
            user:null
        }
})

export const postLogin = createAsyncThunk('auth/postLogin',async ({username,password})=>{
    try{
        const response = await axios.post(`${apiUrl}/auth/login`,{username,password})
        if(response.data.success){
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,response.data.accessToken)    
            const resGetUser = await loadUser()
           
            if(!resGetUser.success){
                return {
                    isAuthentication:false,
                    user:null,
                    isError:true,
                    messageError: resGetUser.message
                }
            }

            return{
                isAuthentication:true,
                user:resGetUser.user,
                isError:false,
                messageError:''
            }
        }
        return {
            isAuthentication:false,
            user:null,
            isError:true,
            messageError: response.data.message
        }
    }catch(error){
        console.log(error)
        return {
            isAuthentication:false,
            user:null,
            isError:true,
            messageError:'Your connection was interrupted!!'
        }
    }
})


export const postRegister = createAsyncThunk('auth/postRegister', async({username,password})=>{
    try{
        const response = await axios.post(`${apiUrl}/auth/register`,{username,password})
        if(response.data.success){
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,response.data.accessToken)    
            const resGetUser = await loadUser()
           
            if(!resGetUser.success){
                return {
                    isAuthentication:false,
                    user:null,
                    isError:true,
                    messageError: resGetUser.message
                }
            }

            return{
                isAuthentication:true,
                user:resGetUser.user,
                isError:false,
                messageError:''
            }
        }
        return {
            isAuthentication:false,
            user:null,
            isError:true,
            messageError: response.data.message
        }
    }catch(error){
        console.log(error)
        return {
            isAuthentication:false,
            user:null,
            isError:true,
            messageError:'Your connection was interrupted!!'
        }
    }
})


export const updateProfile = createAsyncThunk('auth/updateProfile',async (formData)=>{

    try{
        const response = await axios.post(`${apiUrl}/upload`,formData)
        if(response.data.success){
            return{
                path:response.data.path
            }
        }
        return{
            path:null
        }
    }catch(error){
        console.log(error)
        return {
            path:null
        }
    }
})