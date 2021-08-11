
import { SET_AUTH } from "../context/constant"


const authReducer = (state,action)=>{

    const {type,payload}=action
    
    switch(type){
        case SET_AUTH:

            return {
                ...state,
                isLoading:false,
                isAuthentication:payload.isAuthentication,
                user: payload.user
            }
        default:
            return state
    }
}


export default authReducer