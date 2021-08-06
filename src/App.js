import React,{useEffect} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import ProtectRoute from './components/routing/ProtectRoute'

import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Home from './pages/Home'
import TodoList from './pages/TodosList'
import Profile from './pages/Profile'

import { loadData } from './redux/actions/authAction'

const App= () => {

    const dispatch = useDispatch()
    useEffect(()=>{dispatch(loadData())},[dispatch])
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Landing}/>
                <Route path='/login'  render={props=><Auth {...props} authRoute="login"/>}/>
                <Route path='/register'  render={props=><Auth {...props} authRoute="register"/>}/>
                <ProtectRoute path='/todoslist' exact component={TodoList}/>
                <ProtectRoute path='/home' exact component={Home}/>
                <ProtectRoute path="/profile" exact component={Profile}/>

            </Switch>
        </BrowserRouter>
    )
}

export default App
