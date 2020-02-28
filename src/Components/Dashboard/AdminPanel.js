import React, { Component } from 'react';
import { getPatientsList } from '../../redux/reducers/therapistReducer';
import { retrieveUser } from '../../redux/reducers/authReducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Patient from '../Patients/Patient';
import PendingPatient from '../Patients/PendingPatient';

class AdminPanel extends Component{
    componentDidMount(){
        let { user_id } = this.props.user;
        this.props.retrieveUser();
        this.props.getPatientsList( user_id );
    }
    render(){
        var currentPatient = this.props.patientList.map( (patient, i) => {
            if(patient.status === 'active'){
                return <Patient key={i} patientInfo={ patient } />
            }
        } )
        var pendingPatient = this.props.patientList.filter( (patient, i) => {
            if(patient.status === 'pending'){
                return <PendingPatient key={i} patientInfo={ patient } />
            }
        } )
        return(
            <div className='adminPanel'>
                <h1>Admin Panel</h1>
                <div className='col small-12 medium-6'>
                    <h2>Current Clients</h2>
                    { currentPatient }
                </div>
                <div className='col small-12 medium-6'>
                    <h2>Pending Clients</h2>
                    {   pendingPatient.length > 0
                        ?
                            pendingPatient
                        :
                            'No Clients currently pending' 
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    let { user } = state.authReducer,
        { patientList } = state.therapistReducer;

    return{
        user,
        patientList
    }
}

export default withRouter(connect(
    mapStateToProps,
    {
        getPatientsList,
        retrieveUser
    }
)
(AdminPanel));