import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Components/Home';
import Landing from './Components/Landing';
import Login from './Components/Login';
import Register from './Components/Register/Register';
import Profile from './Components/Profile/Profile';


export default(
    <Switch>
        <Route
            component={Profile}
            path='/profile'
        />
        <Route 
            component={Login} 
            path="/login"
        />
        <Route
            component={Register}
            path='/register'
        />
        <Route 
            component={Home} 
            path="/home"
        />
        <Route
            component={Landing}
            path="/"
        />
    </Switch>
);