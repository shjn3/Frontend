import { createSlice } from "@reduxjs/toolkit"
import { loadData,postLogin,postRegister,Logout,updateProfile } from "../actions/authAction"



const authSlice = createSlice({
    name:'auth',
    initialState:{
        authLoading: true,
        isAuthentication: false,
        user:null,
        isError: false,
        messageError: ''
    },
    reducers:{
        setError: (state,action)=>{
            state.isError = action.payload
            state.messageError=''
        },
        setLogout: (state,action)=>{
            Logout()
            state.isAuthentication=action.payload
            state.user=null
        }
    },
    extraReducers: {
        //post Login    
        [postLogin.fulfilled]: (state,action)=>{
            const {isAuthentication,user,isError,messageError} = action.payload
            state.isAuthentication = isAuthentication
            state.user = user
            state.isError =  isError
            state.messageError = messageError
        },
        [loadData.fulfilled]: (state,action)=>{
            const {isAuthentication,authLoading,user} = action.payload
            state.isAuthentication=isAuthentication
            state.authLoading = authLoading
            state.user = user
        },
        [postRegister.fulfilled]: (state,action)=>{
            const {isAuthentication,user,isError,messageError} = action.payload
            state.isAuthentication = isAuthentication
            state.user = user
            state.isError =  isError
            state.messageError = messageError
        },
        [updateProfile.fulfilled]: (state,action)=>{
            const {path} = action.payload
            if(path !==null){
                state.user.avatar=path
            }
        }
    }
})

const authReducer = authSlice.reducer
export const {setError,setLogout} = authSlice.actions
export const authSelector = state => state.auth

export default authReducer



