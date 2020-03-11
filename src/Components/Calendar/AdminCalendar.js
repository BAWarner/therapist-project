import React, { Component } from 'react';
import { getAllTherapistAppointments } from '../../redux/reducers/appointmentReducer';
import { retrieveUser } from '../../redux/reducers/authReducer';
import { connect } from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';


const localizer = momentLocalizer(moment);



class AdminCalendar extends Component{
    constructor(){
        super();
        this.state = {
            appointments: [],
            appointment_id: null,
            start: '',
            end: '',
            title: '',
            price: null,
            showForm: false,
            edited: false
        }
    }
    handleSelect = ({ start, end }) => {
        this.setState({ 
            start,
            end,
            showForm: !this.state.showForm
        })
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleCancel = () => {
        let { showForm } = this.state;
        this.setState({ 
            showForm: !showForm,
            start: '',
            end: '',
            title: '',
            price: null,
            edited: false
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let { start, end, title, price, appointments, showForm, edited } = this.state;
        if(!edited){
            let newAppointment = {
                start,
                end,
                title,
                price,
                unsaved: true
            }
            if(title){
                this.setState({ 
                    appointments: [...appointments, newAppointment],
                    showForm: !showForm,
                    start: '',
                    end: '',
                    title: '',
                    price: null
                });
            }
        }else{
            
        }
    }
    handleSave = () => {
        var { appointments } = this.state;
        let { user_id: therapist_id } = this.props.user;
        if(appointments.length > 0){
            let unsaved = appointments.filter( appointment => appointment.unsaved );
            unsaved.forEach( appt => {
                axios
                .post(`/api/therapists/appointments/${therapist_id}`, appt)
                .then( () => {
                    this.props.getAllTherapistAppointments(therapist_id)
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
                        this.setState({ appointments: filteredApts });
                    } )
                    .catch( err => console.error(err) );
                } )
                .catch( err => console.log(err) );
            });
        }
    }
    handleEvent = e => {
        let { title, price, start, end, appointment_id } = e;
        this.setState({ 
            appointment_id,
            title, 
            price, 
            start, 
            end,
            showForm: true,
            edited: true
        });
        console.log(e);

        
    }
    componentDidMount(){
        this.props.retrieveUser();
        if( this.props.user.admin ){
            this.props.getAllTherapistAppointments( this.props.user.user_id )
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
                this.setState({ appointments: filteredApts });
            } )
            .catch( err => console.error(err) );

        }
    }
    render(){
        let { price, title, start, end, edited } = this.state;
        return(
            <div>
                <button className='small mrg-btm-25' onClick={this.handleSave}>Save</button>
                <Calendar
                    selectable
                    localizer={localizer}
                    events={this.state.appointments}
                    defaultDate={new Date()}
                    defaultView='week'
                    style={{ height: '100vh' }}
                    onSelectSlot={ this.handleSelect }
                    onSelectEvent={ e => this.handleEvent(e) }
                />
                {
                    this.state.showForm
                    ?
                        <div className='lightbox text-center'>
                            <div className='overlay'></div>
                            <div className='form createEvent'>
                                <h3 className='mrg-btm-25'>Create New Event</h3>
                                <input
                                    placeholder='Event Title'
                                    type='text' 
                                    name='title' 
                                    value={title ? title : ''} 
                                    onChange={ e => this.handleChange(e) } 
                                />
                                <input type='text' name='start' value={start} onChange={ e => this.handleChange(e) } />
                                <input type='text' name='end' value={end} onChange={ e => this.handleChange(e) } />
                                <input
                                    placeholder='Price of Event'
                                    type='number' name='price'
                                    value={price ? price : null}
                                    onChange={ e => this.handleChange(e) }
                                    className='block width-100-p mrg-btm-25'
                                />
                                <button onClick={this.handleSubmit}>{ edited ? 'Edit' : 'Add Appointment'}</button>
                                <button className='small cancel' onClick={ this.handleCancel }>Cancel</button>
                            </div>
                        </div>
                    : null
                }
            </div>
        );
    }

}

const mapStateToProps = state => {
    let { appointments } = state.appointmentReducer,
        { user } = state.authReducer

    return{
        appointments,
        user
    }
}

export default connect(
    mapStateToProps,
    {
        getAllTherapistAppointments,
        retrieveUser
    }
)
(AdminCalendar);