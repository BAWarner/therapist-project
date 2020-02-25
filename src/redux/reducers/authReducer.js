import axios from 'axios';

var initialState = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    profile_image: '',
    user: {},
    loading: false
}

const UPDATE_STATE = 'update_state';
const RESET_FIELDS = 'reset_fields';
const LOGIN_USER = 'login_user';
const REGISTER_USER = 'register_user';
const LOGOUT_USER = 'logout_user';
const RETRIEVE_USER = 'retrieve_user';
const UPDATE_CURRENT_USER = 'update_current_user';

export const updateState = e => {
    return {
        type: UPDATE_STATE,
        payload: e
    }
}

export const resetFields = () => {
    return{
        type: RESET_FIELDS
    }
}

export const loginUser = (username, password) => {
    let body = {
        username,
        password
    }
    return{
        type: LOGIN_USER,
        payload: axios.post('/auth/login', body)
    }
}

export const registerUser = ( username, password, firstName, lastName, admin ) => {
    let body = {
        username,
        password,
        firstName,
        lastName
    },
    optionalParam;

    if(admin){
        optionalParam = '/admin'
    }
    else{
        optionalParam = '';
    }
    return {
        type: REGISTER_USER,
        payload: axios.post(`/auth/register${optionalParam}`, body)
    }
}

export const logOut = () => {
    return{
        type: LOGOUT_USER,
        payload: axios.get('/auth/logout')
    }
}

export const retrieveUser = () => {
    return{
        type: RETRIEVE_USER,
        payload: axios.get('/auth/retrieve')
    }
}

export const updatePatient = ( userInfo ) => {
    let { user_id } = userInfo;
    return{
        type: UPDATE_CURRENT_USER,
        payload: axios.put(`/api/patients/${user_id}`, userInfo)
    }
}

const authReducer = ( state = initialState, action ) => {
    let { type, payload } = action;
    switch(type){
        case UPDATE_STATE:
            return{
                ...state,
                ...payload
            }
        case RESET_FIELDS:
            return{
                username: '',
                password: '',
                profile_image: '',
                user: {},
                loading: false
            }
        case `${LOGIN_USER}_PENDING`:
            return{
                loading: true,
                ...state
            }
            case `${LOGIN_USER}_FULFILLED`:
            return{
                ...state,
                loading: false,
                user: payload.data
            }
        case `${LOGOUT_USER}_PENDING`:
            return{
                ...state,
                loading: true
            }
        case `${LOGOUT_USER}_FULFILLED`:
            return{
                ...state,
                loading: false,
                user: {}
            }
        case `${RETRIEVE_USER}_PENDING`:
            return{
                ...state,
                loading: true
            }
        case `${RETRIEVE_USER}_FULFILLED`:
            return{
                ...state,
                loading: false,
                user: payload.data
            }
        case `${UPDATE_CURRENT_USER}_PENDING`:
            return{
                ...state,
                loading: true
            }
        case `${UPDATE_CURRENT_USER}_FULFILLED`:
            return{
                ...state,
                loading: false,
                user: payload.data
            }
        default: return state;
    }
}

export default authReducer;