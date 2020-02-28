import { createStore, combineReducers, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';

import authReducer from './reducers/authReducer';
import therapistReducer from './reducers/therapistReducer';
import resourceReducer from './reducers/resourceReducer';

var combinedReducers = combineReducers(
    {
        authReducer,
        therapistReducer,
        resourceReducer
    }
);

export default createStore( combinedReducers, applyMiddleware(promise) )