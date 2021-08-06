import React from 'react'
import { Redirect } from 'react-router'
import {useDispatch,useSelector} from 'react-redux'
import styled from 'styled-components'

import Spinner from 'react-bootstrap/Spinner'
import Toast from 'react-bootstrap/Toast'

import Footer from '../components/layout/footer'
import LoginForm from '../components/form/LoginForm'
import RegisterForm from '../components/form/RegisterForm'
import {authSelector,setError} from '../redux/reducers/authReducer'

const ToastStyled = styled(Toast)`
    margin-top: 100px;
    margin-right: 100px;
    right:0;
    position: absolute;
    z-index: 1;
    border-radius:
    visibility:hidden;
    opacity: 0;
    color: #fff;
    &.show--error{
        visibility:visible;
        opacity: 1;
    }
`


const Auth = (props) => {
    const {authRoute} = props 
    const data = useSelector(authSelector)
    const dispatch = useDispatch()
    
    
    const onClose=()=>{
        dispatch(setError(false))
    }
    const {isAuthentication,authLoading,isError,messageError} = data
    let body

    if(authLoading){
        body=(
            <div className="loading">
                    <Spinner animation="border" variant="info" style={{width: '4rem',height: '4rem'}}/>
            </div>
        )
    }
    else if(isAuthentication) return <Redirect to='/home'/>
    else
    body =(
        <>
            <ToastStyled className={isError?"show--error":""} bg="dark" onClose={onClose.bind(this)}>
                <Toast.Header>
                    <strong className="me-auto">Message Error</strong>
                </Toast.Header>
                <Toast.Body>{messageError}</Toast.Body>
            </ToastStyled>
            <div className="container">
                {authRoute === 'login' && <LoginForm/>}
                {authRoute ==='register' && <RegisterForm/>}
            </div>
        </>
    )
    return (
        <>
        <div className="main">
            {body}
            <Footer/>
        </div>
        </>
    )
}

export default Auth
