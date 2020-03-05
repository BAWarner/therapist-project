import { createStore, combineReducers, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';

import authReducer from './reducers/authReducer';
import therapistReducer from './reducers/therapistReducer';
import resourceReducer from './reducers/resourceReducer';
import appointmentReducer from './reducers/appointmentReducer';

var combinedReducers = combineReducers(
    {
        authReducer,
        therapistReducer,
        resourceReducer,
        appointmentReducer
    }
);

export default createStore( combinedReducers, applyMiddleware(promise) )