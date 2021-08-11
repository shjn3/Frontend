import React,{useState,useContext} from 'react'
import {Form,Input,Button} from 'antd'
import { AuthContext } from '../context/authContext'
import {Redirect} from 'react-router-dom'



const Auth = () => {
    const {loginUser,authState:{isAuthentication}} = useContext(AuthContext)
    const [username,setUsername] = useState('')

    const OnSubmit = ()=>{
        if(username){
            loginUser(username)
        }
    }

    if(isAuthentication)
        return <Redirect to='/messenger'/>

    return (
            
            <Form layout="inline" style={{justifyContent:'center', marginTop:'40px'}} onFinish={OnSubmit}>
                <Form.Item name="userId" label="username" >
                    <Input style={{width: '300px'}}
                    onChange={e=>setUsername(e.target.value)}
                    value={username}/>
                </Form.Item>
                <Form.Item style={{justifyContent:'center'}}>
                    <Button type="primary" htmlType="submit">Log in</Button>
                </Form.Item>
            </Form>
    )
}

export default Auth
