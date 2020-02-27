import axios from 'axios';

const initialState = {
    therapists: [],
    loading: false,
    rating: null,
    reviews: [],
    patientList: []
}

const GET_ALL_THERAPISTS = 'get_all_therapists';
const GET_ALL_REVIEWS = 'get_all_reviews';
const GET_THERAPIST_RATING = 'get_therapist_rating';
const GET_PATIENTS_LIST = 'get_patients_list';
// const GET_THERAPIST_SPECIALTIES = 'get_therapist_specialties';

export const getAllTherapists = () => {
    return{
        type: GET_ALL_THERAPISTS,
        payload: axios.get('/api/therapists')
    }
}

export const getTherapistRating = therapist_id => {
    return{
        type: GET_THERAPIST_RATING,
        payload: axios.get(`/api/therapists/ratings/${therapist_id}`)
    }
}

export const getAllReviews = () => {
    return{
        type: GET_ALL_REVIEWS,
        payload: axios.get(`/api/therapists/reviews`)
    }
}

// export const getTherapistSpecialties = therapist_id => {
//     return{
//         type: GET_THERAPIST_SPECIALTIES,
//         payload: axios.get(`/api/therapists/specialties/${therapist_id}`)
//     }
// }

export const getPatientsList = therapist_id => {
    return{
        type: GET_PATIENTS_LIST,
        payload: axios.get(`/api/therapists/patients/${therapist_id}`)
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
        case `${GET_THERAPIST_RATING}_PENDING`:
            return{
                ...state,
                loading: true
            }
        case `${GET_THERAPIST_RATING}_FULFILLED`:
            return{
                ...state,
                loading: false,
                rating: payload.data[0].avg
            }
        case `${GET_ALL_REVIEWS}_PENDING`:
            return{
                ...state,
                loading: true
            }
        case `${GET_ALL_REVIEWS}_FULFILLED`:
            return{
                ...state,
                loading: false,
                reviews: payload.data
            }
        case `${GET_PATIENTS_LIST}_PENDING`:
            return{
                ...state,
                loading: true
            }
        case `${GET_PATIENTS_LIST}_FULFILLED`:
            return{
                ...state,
                loading: false,
                patientList: payload.data
            }
        // case `${GET_THERAPIST_SPECIALTIES}_PENDING`:
        //     return{
        //         ...state,
        //         loading: true
        //     }
        // case `${GET_THERAPIST_SPECIALTIES}_FULFILLED`:
        //     return{
        //         ...state,
        //         loading: false,
        //         specialties: payload.data
        //     }

        default: return state;
    }

}

export default therapistReducer;