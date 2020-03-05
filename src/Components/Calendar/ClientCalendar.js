import React, { Component } from 'react';
import { getAllTherapistAppointments } from '../../redux/reducers/appointmentReducer';
import { connect } from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import CheckoutForm from '../Stripe/CheckoutForm';
import axios from 'axios';

const localizer = momentLocalizer(moment);



class ClientCalendar extends Component{
    constructor(){
        super();
        this.state = {
            appointments: [],
            appointment_id: null,
            start: '',
            end: '',
            title: '',
            price: null,
            showPayment: false,
            details: {
                therapist_id: null,
                user_id: null
            }
        }
    }
    handleEvent = e => {
        let { title, price, appointment_id } = e;
        this.setState({ 
            appointment_id,
            title, 
            price, 
            showPayment: true
        });
        
    }
    updateAppointmentsList = () => {
        if(this.props.user.user_id ){
            let { id: therapist_id } = this.props.user.therapist_info;
            this.props.getAllTherapistAppointments( therapist_id )
            .then( () => {
                let filteredApts = this.props.appointments.filter( appointment => {
                    if(appointment.patient_id){
                        return false;
                    }else{
                        appointment['end'] = appointment['endapt'];
                        delete appointment['endapt'];
                        appointment['start'] = new Date(appointment['start']);
                        appointment['end'] = new Date(appointment['end']);
                        return true;
                    }
                });
                this.setState({ 
                    appointments: filteredApts,
                    details: {
                        therapist_id,
                        user_id: this.props.user.user_id
                    },
                    showPayment: false
                });
            } )
            .catch( err => console.error(err) );
        }
    }
    componentDidMount(){
        this.updateAppointmentsList();
    }
    render(){
        let { showPayment, price, title, appointment_id, details } = this.state;
        return(
            <div>
                <Calendar
                    selectable
                    localizer={localizer}
                    events={this.state.appointments}
                    defaultDate={new Date()}
                    defaultView='month'
                    style={{ height: '100vh' }}
                    onSelectEvent={ e => this.handleEvent(e) }
                />
                {
                    showPayment
                    ? <CheckoutForm
                            amount={price}
                            name={title}
                            details={details}
                            appointment={appointment_id}
                            update={this.updateAppointmentsList}
                        />
                    : null
                }
            </div>
        );
    }

}

const mapStateToProps = state => {
    let { appointments } = state.appointmentReducer

    return{
        appointments
    }
}

export default connect(
    mapStateToProps,
    {
        getAllTherapistAppointments
    }
)
(ClientCalendar);