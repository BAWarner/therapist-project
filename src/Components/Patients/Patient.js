import React, { Component } from 'react';

class Patient extends Component{
    render(){
        let { firstname, lastname, profile_image, emailaddress } = this.props.patientInfo;
        return(
            <div className='card col-sm-12 col-md-6 patient mrg-btm-25'>
                <div className='inner-card'>
                    <img
                        src={profile_image ? profile_image : 'https://www.fillmurray.com/400/500'} 
                        alt={`${firstname} ${lastname} profile `}
                    />
                    <h3>{`${firstname} ${lastname}`}</h3>
                    <h5>
                        <a href={`mailto:${emailaddress}`}>
                            {emailaddress}
                        </a>
                    </h5>
                </div>
            </div>
        );
    }
}

export default Patient;