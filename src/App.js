import React from "react";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Auth from "./pages/auth";
import Message from "./pages/message";
import Landing from "./components/Landing";
import AuthContextProvider from "./context/authContext"
import ProtectRoute from "./components/routing/protectRoute";
import Test from "./components/test";

function App() {
  return (
    <AuthContextProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Landing}/>
            <Route path="/login" exact component={Auth} />
            <ProtectRoute path="/messenger" exact component={Message}/>
            <ProtectRoute path ="/test" exact component ={Test}/>
          </Switch>
        </Router>
    </AuthContextProvider>
  );
}

export default App;
