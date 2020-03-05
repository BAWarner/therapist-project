import React, { Component } from 'react';
import { getPatientsList } from '../../redux/reducers/therapistReducer';
import { retrieveUser } from '../../redux/reducers/authReducer';
import { getAllTherapistAppointments } from '../../redux/reducers/appointmentReducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Patient from '../Patients/Patient';
import PendingPatient from '../Patients/PendingPatient';
import AdminAgenda from '../Calendar/AdminAgenda';

class AdminPanel extends Component{
    componentDidMount(){
        let { retrieveUser, getPatientsList, 
            getAllTherapistAppointments, user } = this.props,
            { user_id } = user;

        retrieveUser();
        getPatientsList( user_id );
        getAllTherapistAppointments( user_id );
    }
    sortDate = (a, b) => {
        const appointmentA = new Date(a.props.appointment.start);
        const appointmentB = new Date(b.props.appointment.start);

        let comparison = 0;
        if( appointmentA >  appointmentB ){
            comparison = 1
        } else if( appointmentA < appointmentB ){
            comparison = -1
        }
        return comparison;
    }
    render(){
        let { patientList, appointments } = this.props;

        var currentPatient = patientList.map( (patient, i) => {
            if(patient.status === 'active'){
                return <Patient key={i} patientInfo={ patient } />;
            }
        } )
        var pendingPatient = patientList.filter( (patient, i) => {
            if(patient.status === 'pending'){
                return <PendingPatient key={i} patientInfo={ patient } />;
            }
        } )
        var upcomingAppointments = appointments.map( (appointment, i) => {
            let now = Date.now(),
                start = new Date(appointment.start);

            if(appointment.patient_id && start > now){
                return <AdminAgenda key={i} appointment={ appointment } />;
            }
        }).sort(this.sortDate);
        return(
            <div className='adminPanel'>
                <h1>Admin Panel</h1>
                <div className='row align-top justify-between'>
                    <div className='col col-sm-12 col-md-8'>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <h2>Pending Clients</h2>
                                {   pendingPatient.length > 0
                                    ?
                                        pendingPatient
                                    :
                                        'No Clients currently pending' 
                                }
                            </div>
                            <div className='col-sm-12'>
                                <h2>Current Clients</h2>
                                { currentPatient }
                            </div>
                        </div>
                    </div>
                    <div className='col col-md-4 col-sm-12'>
                        {
                            upcomingAppointments.length > 0
                            ? upcomingAppointments
                            : 'No Upcoming Appointments'
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    let { user } = state.authReducer,
        { patientList } = state.therapistReducer,
        { appointments } = state.appointmentReducer;

    return{
        user,
        patientList,
        appointments
    }
}

export default withRouter(connect(
    mapStateToProps,
    {
        getPatientsList,
        retrieveUser,
        getAllTherapistAppointments
    }
)
(AdminPanel));