import { createStore, combineReducers, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';

import authReducer from './reducers/authReducer';

var combinedReducers = combineReducers(
    {
        authReducer
    }
);

export default createStore( combinedReducers, applyMiddleware(promise) )