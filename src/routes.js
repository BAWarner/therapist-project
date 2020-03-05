import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Components/Home';
import Landing from './Components/Landing';
import Login from './Components/Login';
import Register from './Components/Register/Register';
import Profile from './Components/Profile/Profile';
import CalendarViews from './Components/Calendar/Calendar';
import Resources from './Components/Resources/Resources';


export default(
    <Switch>
        <Route
            component={CalendarViews}
            path='/calendar'
        />
        <Route
            component={Resources}
            path='/resources'
        />
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