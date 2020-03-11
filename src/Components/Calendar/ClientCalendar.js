import React, { Component } from 'react';
import { getAllTherapistAppointments } from '../../redux/reducers/appointmentReducer';
import { connect } from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import CheckoutForm from '../Stripe/CheckoutForm';

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
    togglePayment = () => {
        this.setState({ showPayment: !this.state.showPayment });
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
                    ? 
                    <div className='lightbox text-center'>
                        <div className='overlay'></div>
                        <div className='form showPayment row align-items-center'>
                            <button className='small cancel' onClick={ this.togglePayment }>Cancel</button>
                            <div className='col-sm-12'>
                                <h3 className='mrg-btm-25'>Book your <br/>'{title}'<br/> appointment in advance!</h3>
                                <CheckoutForm
                                    amount={price}
                                    name={title}
                                    details={details}
                                    appointment={appointment_id}
                                    update={this.updateAppointmentsList}
                                />
                            </div>
                        </div>
                    </div>
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