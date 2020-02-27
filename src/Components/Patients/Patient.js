import React, { Component } from 'react';

class Patient extends Component{
    render(){
        let { firstname, lastname, profile_image, emailaddress } = this.props.patientInfo;
        return(
            <div className='card patient'>
                <img
                    src={profile_image ? profile_image : 'https://www.fillmurray.com/300/200'} 
                    alt={`${firstname} ${lastname} profile picture`}
                />
                <h1>{`${firstname} ${lastname}`}</h1>
                <h2>{`${emailaddress}`}</h2>
            </div>
        );
    }
}

export default Patient;