import React, { Component } from 'react';

class Therapist extends Component{
    render(){
        console.log(this.props.therapist);
        let { firstname, lastname, profile_image, education, 
            length_of_sessions, about, insurance, emailaddress } = this.props.therapist;
        
        return(
            <div className='therapist card'>
                <h1>{`${firstname} ${lastname}`}</h1>
                <img 
                    src={
                        profile_image ? profile_image : 'https://cdn4.iconfinder.com/data/icons/hospital-1-1/512/Counselling-512.png'
                    }
                    alt={`${firstname} ${lastname} profile picture`} 
                />
                <div className='row justify-between'>
                    <span className='inline-block'><strong>Education:</strong> {education}</span>
                    <span className='inline-block'><strong>Typical Session Duration:</strong> {length_of_sessions} Minutes</span>
                    <span className='inline-block'><strong>Take insurance:</strong> {insurance ? 'Yes' : 'No'}</span>
                    <span className='inline-block'><strong>Extra Info:</strong> {about}</span>
                    <span className='inline-block'><strong>Contact Info:</strong> {emailaddress}</span>
                </div>
            </div>
        );
    }
}

export default Therapist;