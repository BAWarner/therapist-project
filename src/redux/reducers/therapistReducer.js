import axios from 'axios';

const initialState = {
    therapists: [],
    loading: false
}

const GET_ALL_THERAPISTS = 'get_all_therapists';

export const getAllTherapists = () => {
    return{
        type: GET_ALL_THERAPISTS,
        payload: axios.get('/api/therapists')
    }
}

const therapistReducer = (state=initialState, action) => {
    let { type, payload } = action;

    switch(type){
        case `${GET_ALL_THERAPISTS}_PENDING`:
            return{
                ...state,
                loading: true
            }
        case `${GET_ALL_THERAPISTS}_FULFILLED`:
            return{
                ...state,
                therapists: payload.data,
                loading: false
            }

        default: return state;
    }

}

export default therapistReducer;