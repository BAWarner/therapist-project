import axios from 'axios';

const initialState = {
    loading: false,
    appointments: []
}

const GET_ALL_THERAPIST_APPOINTMENTS = 'get_all_therapist_appointments';
const GET_MY_THERAPIST_APPOINTMENTS = 'get_my_therapist_appointments';

export const getAllTherapistAppointments = therapist_id => {
    return{
        type: GET_ALL_THERAPIST_APPOINTMENTS,
        payload: axios.get(`/api/therapists/appointments/${therapist_id}`)
    }
}

export const getMyTherapistAppointments = (therapist_id, user_id) => {
    return{
        type: GET_MY_THERAPIST_APPOINTMENTS,
        payload: axios.get(`/api/patients/appointments/${user_id}?therapist=${therapist_id}`)
    }
}

const appointmentReducer = (state=initialState, action ) => {
    let { type, payload } = action;

    switch(type){
        case `${GET_ALL_THERAPIST_APPOINTMENTS}_PENDING`:
            return{
                ...state,
                loading: true
            }
        case `${GET_ALL_THERAPIST_APPOINTMENTS}_FULFILLED`:
            return{
                ...state,
                loading: false,
                appointments: payload.data
            }
        case  `${GET_MY_THERAPIST_APPOINTMENTS}_PENDING`:
            return{
                ...state,
                loading: true
            }
        case  `${GET_MY_THERAPIST_APPOINTMENTS}_FULFILLED`:
            return{
                ...state,
                loading: false,
                appointments: payload.data
            }
        default: return state;
    }

}

export default appointmentReducer;