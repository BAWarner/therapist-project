import React, { Component } from 'react';
import { getAllTherapists, getAllReviews } from '../../redux/reducers/therapistReducer';
import { retrieveUser } from '../../redux/reducers/authReducer';
import { getMyAppointments } from  '../../redux/reducers/appointmentReducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Therapist from '../Therapists/Therapist';
import ClientAgenda from '../Calendar/ClientAgenda';

class Dashboard extends Component{
    sortDate = (a, b) => {
        const appointmentA = new Date(a.props.appointment.start);
        const appointmentB = new Date(b.props.appointment.start);

        let comparison = 0;
        if( appointmentA > appointmentB ){
            comparison = 1
        }else if( appointmentA < appointmentB ){
            comparison = -1
        }
        return comparison;
    }
    sortTherapist = (a, b) => {
        const therapistIdA = a.props.therapist.therapist_id;
        const therapistIdB = b.props.therapist.therapist_id;
        let comparison = 0;
        if( therapistIdA > therapistIdB ){
            comparison = 1;
        }else if( therapistIdA < therapistIdB ){
            comparison = -1;
        }
        return comparison;
    }
    componentDidMount(){
        let { getAllTherapists, getAllReviews, retrieveUser, getMyAppointments } = this.props;
        getAllTherapists();
        getAllReviews();
        retrieveUser()
        .then( () => {
            let { user_id } = this.props.user;
            let therapist_id = this.props.user.therapist_info.id;
            getMyAppointments(therapist_id, user_id);
        } )
        .catch( err => console.log(err) );
    }
    render(){
        let { reviews, loading, user, appointments, therapists } = this.props;
        let therapistsMapped = therapists.map( (therapist, i) => {
            var therapistReviews = reviews.filter( review => review.therapist_id === therapist.therapist_id );
            return <Therapist key={i} therapist={therapist} userInfo={this.props.user} reviews={therapistReviews} />
        } ).sort(this.sortTherapist);
        let appointmentsMapped = appointments.map( (appointment, i) => {
            return <ClientAgenda key={i} appointment={appointment} therapist={ this.props.user.therapist_info } />
        }).sort(this.sortDate);

        return(
            <div className='dashboard'>
                <div className='row align-top justify-between row-mobile-reverse'>
                    <div className='col-sm-12 col-md-8'>
                        {
                            user.status === 'active'
                            ? <h3 className='mrg-btm-25'>Your Main Therapist: {user.therapist_info.name}</h3>
                            : null
                        }
                        { loading 
                            ? <img src='https://resources.humandx.org/static/img/loading_spinner.gif' alt='loading'/> 
                            : <div className='row align-item-top justify-between'>{therapistsMapped}</div>
                        }
                    </div>
                    <div className='col-sm-12 col-md-4'>
                        {
                            appointmentsMapped.length > 0
                            ? <><h3 className='mrg-btm-25'>Upcoming Appointments</h3>{appointmentsMapped}</>
                            : 'No Upcoming Appointments Scheduled'
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    let { therapists, loading, reviews } = state.therapistReducer;
    let { user } = state.authReducer;
    let { appointments } = state.appointmentReducer;
    return{
        therapists,
        reviews,
        user,
        loading,
        appointments
    }
}

export default withRouter(connect(
    mapStateToProps,
    {
        getAllTherapists,
        getAllReviews,
        retrieveUser,
        getMyAppointments
    }
)(Dashboard));