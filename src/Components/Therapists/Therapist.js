import React, { Component } from 'react';
import axios from 'axios';
import Review from '../Reviews/Review';
import Compose from '../Reviews/Compose';

class Therapist extends Component{
    constructor(){
        super();
        this.state = {
            ratings: null
        }
    }
    componentDidMount(){
        let { therapist_id } = this.props.therapist;
        axios
        .get(`/api/therapists/ratings/${therapist_id}`)
        .then( res => {
            this.setState({ratings: res.data[0].avg})
        } )
        .catch( err => console.log(err) );

    }
    render(){
        let { therapist_id, firstname, lastname, profile_image, education, 
            length_of_sessions, about, insurance, emailaddress } = this.props.therapist;
        var number = +this.state.ratings;
        let reviewList = this.props.reviews.map( (review, i) => <Review key={i} review={review} /> )
        return(
            <div className='therapist card'>
                {this.state.ratings ? number.toFixed(1) : null}
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
                <div className='wrap reviews'>
                    Reviews
                    { reviewList }
                    <Compose therapist={therapist_id} />
                </div>
            </div>
        );
    }
}

export default Therapist;