import React,{useContext} from 'react'
import {Redirect,Route} from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

const ProtectRoute = ({component:Component,...rest}) => {
    const {
        authState:{isAuthentication,isLoading}
    } = useContext(AuthContext)

    if(isLoading){
        return <div>Watting...!!!</div>
    }


    return (
        <Route {...rest} render={
            props=>isAuthentication?
            (
            <Component {...rest} {...props}/>
            )
            :(
            <Redirect to='/login'/>
            )
        }
        />
    )
}

export default ProtectRoute
