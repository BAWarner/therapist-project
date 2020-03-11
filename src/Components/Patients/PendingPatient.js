import React, { Component } from 'react';
import Patient from './Patient';
import axios from 'axios';

class PendingPatient extends Component{
    handleDecision = e => {
        let { status_id } = this.props.patientInfo;
        axios
        .put(`/api/therapists/patients/${status_id}`, {decision: e.target.name})
        .then( )
        .catch( err => console.error(err) );
    }
    render(){
        return(
            <>
                <Patient patientInfo={ this.props.patientInfo }/>
                <div className='col-sm-12'>
                    <button className='small mrg-right-25' name='active' onClick={ e => this.handleDecision(e) }>Accept</button>
                    <button className='small hollow' name='decline' onClick={ e => this.handleDecision(e) }>Decline</button>
                </div>
            </>
        );
    }
}

export default PendingPatient;