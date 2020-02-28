import axios from 'axios';

const initialState = {
    loading: false,
    resources: []
}


const GET_ALL_RESOURCES = 'GET_ALL_RESOURCES';
const GET_THERAPIST_RESOURCES = 'GET_THERAPIST_RESOURCES';
const ADD_RESOURCE = 'ADD_RESOURCE';
const UPDATE_RESOURCE = 'UPDATE_RESOURCE';
const DELETE_RESOURCE = 'DELETE_RESOURCE';


export const getAllResources = () => {
    return{
        type: GET_ALL_RESOURCES,
        payload: axios.get(`/api/resources/`)
    }
}

export const getTherapistResources = therapist_id => {
    return{
        type: GET_THERAPIST_RESOURCES,
        payload: axios.get(`/api/resources/${therapist_id}`)
    }
}

export const addResource = (therapist_id, name, document, description) => {
    let body = {
        name,
        document,
        description
    }
    return{
        type: ADD_RESOURCE,
        payload: axios.post(`/api/resources/${therapist_id}`, body)
    }
}

export const updateResource = (resource_id, name, document, description, therapist_id) => {
    let body = {
        name,
        document,
        description,
        therapist_id
    }
    return{
        type: UPDATE_RESOURCE,
        payload: axios.put(`/api/resources/${resource_id}`, body)
    }
}

export const deleteResource = (resource_id) => {
    return{
        type: DELETE_RESOURCE,
        payload: axios.delete(`/api/resources/${resource_id}`)
    }
}


const resourceReducer = (state=initialState, action) => {
    let { type, payload } = action;
    switch(type){
        
        case `${GET_ALL_RESOURCES}_PENDING`:
            return{
                ...state,
                loading: true
            }
        case `${GET_ALL_RESOURCES}_FULFILLED`:
            return{
                ...state,
                loading: false,
                resources: payload.data
            }
        case `${GET_THERAPIST_RESOURCES}_PENDING`:
            return{
                ...state,
                loading: true
            }
        case `${GET_THERAPIST_RESOURCES}_FULFILLED`:
            return{
                ...state,
                loading: false,
                resources: payload.data
            }
        case `${ADD_RESOURCE}_PENDING`:
            return{
                ...state,
                loading: true
            }
        case `${ADD_RESOURCE}_FULFILLED`:
            return{
                ...state,
                loading: false,
                resources: [ ...state.resources, payload.data ]
            }
            case `${UPDATE_RESOURCE}_PENDING`:
                return{
                    ...state,
                    loading: true
                }
    
            case `${UPDATE_RESOURCE}_FULFILLED`:
                var splice = state.resources.findIndex( resource => resource.resource_id === payload.data.resource_id );
                state.resources.splice(splice, 1);
                return{
                    ...state,
                    loading: false,
                    resources: [...state.resources, payload.data]
                }
            case `${DELETE_RESOURCE}_PENDING`:
                return{
                    ...state,
                    loading: true
                }
            case `${DELETE_RESOURCE}_FULFILLED`:
                var splice = state.resources.findIndex( resource => resource.resource_id === payload.data );
                state.resources.splice(splice, 1);

                return{
                    ...state,
                    loading: false,
                    resources: [...state.resources]
                }
    
            default: return state;
    }
}

export default resourceReducer;