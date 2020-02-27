import axios from 'axios';

const initialState = {

}

const patientReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch(type){
        default: return state;
    }
}

export default patientReducer;