import React from 'react'
import {Route,Switch} from 'react-router-dom'
import Auth from '../pages/auth'
import Landing from '../pages/landing'
const Routes = () => {
    return (
        <Switch>
            <Route path = '/' exact component={Landing}/>
            <Route path = '/register' exact render={props=><Auth {...props} authRoute='register'/>}/>
            <Route path = '/login' exact render={props=><Auth {...props} authRoute='login'/>}/>
        </Switch>
    )
}

export default Routes
