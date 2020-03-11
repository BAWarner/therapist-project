import React, { Component } from 'react';
import axios from 'axios';

class AdminAgenda extends Component{
    constructor(){
        super();
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            details: false
        }
    }
    toggleDetails = () => {
        this.setState({ details: !this.state.details });
    }
    componentDidMount(){
        let { patient_id } = this.props.appointment;
        axios
        .get(`/api/patients/contact/${patient_id}`)
        .then( res => {
            let { firstname, lastname, emailaddress: email } = res.data[0];
            this.setState({
                firstname,
                lastname,
                email
            })
        } )
        .catch( err => console.log(err) );

    }
    render(){
        let { start, endapt } = this.props.appointment;
        let begin = new Date(start),
            end = new Date(endapt),
            beginString = begin.toDateString(),
            beginH = begin.getHours(),
            beginM = begin.getMinutes(),
            endH = end.getHours(),
            endM = end.getMinutes();
        let { firstname, lastname, email, details } = this.state;

        return(
            <div className='agenda mrg-btm-25 pointer' onClick={this.toggleDetails}>
                <h4>{beginString}</h4>
                <span className='block mrg-btm-10'>{`${beginH}:${beginM}`} - {`${endH}:${endM}`}</span>
                <span className='block mrg-btm-5'>{`${firstname} ${lastname}`}</span>
                <span className='block'>{ details ? email : null }</span>
            </div>
        );
    }
}

export default AdminAgenda;