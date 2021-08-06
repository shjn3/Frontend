import React from 'react'
import { useSelector } from 'react-redux'
import {Route,Redirect} from 'react-router-dom'

import NavbarMenu from '../layout/NavbarMenu'
import Spinner from 'react-bootstrap/Spinner'

import {authSelector} from '../../redux/reducers/authReducer'

const ProtectRoute = ({component: Component,...rest}) => {
    const {isAuthentication,authLoading} = useSelector(authSelector)

    if(authLoading){
        return(
            <div className="loading">
                    <Spinner animation="border" variant="info" style={{width: '4rem',height: '4rem'}}/>
            </div>
        )
    }
    return (
        <Route {...rest} render={
            props=>
            isAuthentication===true
            ?(
                <>
                    <NavbarMenu/>
                    <Component {...rest} {...props}/>
                </>
            )
            :(<Redirect to='/login'/>)
            }
        />
    )
}

export default ProtectRoute
