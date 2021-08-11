import React,{createContext,useReducer,useEffect} from 'react'
import axios from 'axios'

import { apiUrl,LOCAL_STORAGE_TOKEN_NAME } from './constant'
import { SET_AUTH } from './constant'
import authReducer from '../reducer/authReducer'
import setToken from '../utils/setAccessToken'

export const AuthContext = createContext()


const AuthContextProvider = ({children})=>{

    const [authState, dispatch] = useReducer(authReducer, {
        isLoading:true,
		isAuthenticated: false,
		user: null
	})

    //Load user
    const loadUser = async ()=>{
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }

        try{
            const response = await axios.get(`${apiUrl}/auth`)
            if(response.data.success){
                dispatch({
                    type: SET_AUTH,
                    payload:{isAuthentication:true, user: response.data.user}
                })
            }
        }catch(error){
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setToken(null)
            dispatch({
                type:SET_AUTH,
                payload:{
                    isAuthentication:false,
                    user:null
                }
            })
        }
    }
    useEffect(()=>{loadUser()},[])
    //Login
    const loginUser = async username=>{
        try{
            const response = await axios.post(`${apiUrl}/auth/login`,{username})
            if(response.data.success){
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,response.data.accessToken)
            }
            await loadUser()
            return response.data
            
        }catch(error){
            console.log(error)
            return {
                success:false
            }
        }
    }

    //context data
    const authContextData = {authState,loadUser,loginUser}


    return (
       <AuthContext.Provider value={authContextData}>
           {children}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider


