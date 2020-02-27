import { createStore, combineReducers, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';

import authReducer from './reducers/authReducer';
import therapistReducer from './reducers/therapistReducer';

var combinedReducers = combineReducers(
    {
        authReducer,
        therapistReducer
    }
);

export default createStore( combinedReducers, applyMiddleware(promise) )