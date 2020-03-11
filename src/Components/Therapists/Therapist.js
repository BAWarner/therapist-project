import React, { Component } from 'react';
import axios from 'axios';
import Review from '../Reviews/Review';
import Compose from '../Reviews/Compose';

class Therapist extends Component{
    constructor(){
        super();
        this.state = {
            ratings: null,
            specialties: [],
            pending: false,
            showMore: false
        }
    }
    handleRequest = () => {
        let body = {
            therapist_id: this.props.therapist.therapist_id,
            user_id: this.props.userInfo.user_id
        }

        if(this.props.userInfo.status){
            axios
            .put('/api/patients/assignments', body)
            .then( () => this.setState({ pending: true }) )
            .catch( err => console.error(err) )
        }else{
            axios
            .post('/api/patients/status', body)
            .then( () => this.setState({ pending: true }) )
            .catch( err => console.error(err) )
        }
        
    }

    toggleMore = () => {
        this.setState({ showMore: !this.state.showMore })
    }

    componentDidMount(){
        let { therapist_id } = this.props.therapist;
        if( this.props.userInfo.status ){
            let { status } = this.props.userInfo;
            console.log( status );
            if(status === 'pending'){
                this.setState({ pending: true })
            }
        }
        
        axios
        .get(`/api/therapists/ratings/${therapist_id}`)
        .then( res => {this.setState({ratings: res.data[0].avg})} )
        .catch( err => console.log(err) );

    }
    render(){
        let { therapist_id, firstname, lastname, profile_image, education, 
            length_of_sessions, about, insurance, emailaddress, amenities,
            methods, specialties } = this.props.therapist;
        var number = +this.state.ratings;
        let reviewList = this.props.reviews.map( (review, i) => <Review key={i} review={review} /> )
        let specialtiesList = specialties.map( (specialty, i) => <li key={i}>{specialty.name} {`(${specialty.abbreviation})`}</li> );
        let methodsList = methods.map( (method, i) => <li key={i}>{method.name}</li> );
        let amenitiesList = amenities.map( (amenity, i) => <li key={i}>{amenity.name}</li> );

        return(
            <div className='therapist card col-sm-12 col-md-6 pad-top-25 pad-btm-25 mrg-btm-25'>
                <div className='inner-card'>
                    <div className='row align-items-center justify-around mrg-btm-25'>
                        <div className='col col-sm-4'>
                            {this.state.ratings ? number.toFixed(1) + '/5' : null}
                        </div>
                        <div className='request col-sm-8 text-right'>
                            {
                                this.state.pending
                                ? <button className='small hollow' disabled>Request Pending</button>
                                : <button className='small hollow' onClick={this.handleRequest}>Request Consultations</button>
                            }
                        </div>
                    </div>
                    <h1>{`${firstname} ${lastname}`}</h1>
                    <img 
                        src={
                            profile_image ? profile_image : 'https://cdn4.iconfinder.com/data/icons/hospital-1-1/512/Counselling-512.png'
                        }
                        alt={`${firstname} ${lastname} profile picture`} 
                    />
                    <div className='row justify-between pad-top-25'>
                        <span className='inline-block col-sm-12'>
                            <strong>Education:</strong> {education}
                        </span>
                        <span className='inline-block col-sm-12'>
                            <strong>Typical Session Duration: </strong> 
                            {
                                length_of_sessions 
                                ? `${length_of_sessions} Minutes`: 
                                'N/A' 
                            }
                        </span>
                        <span className='inline-block col-sm-12'>
                            <strong>Email Address: </strong>
                            <a href={`mailto:${emailaddress}`}>{emailaddress}</a>
                        </span>
                        <span className='inline-block col-sm-12'>
                            <strong>Take insurance:</strong> {insurance ? 'Yes' : 'No'}
                        </span>
                    </div>
                    <button onClick={this.toggleMore} className='mrg-top-25 mrg-btm-25 block pointer small'>
                        {
                            this.state.showMore
                            ? 'See Less'
                            : 'See More'
                        }
                    </button>
                    {
                        this.state.showMore
                        ?
                            <div className='more-details'>
                                <div className='row align-items-top justify-between pad-top-25'>
                                    <span className='inline-block col-sm-12'>
                                        <strong>About:</strong> {about}
                                    </span>
                                    <span className='inline-block col-sm-12'>
                                        <strong>Specialties:</strong> <ul>{specialtiesList}</ul>
                                    </span>
                                    <span className='inline-block col-sm-12'>
                                        <strong>Specific Methods:</strong> <ul>{methodsList}</ul>
                                    </span>
                                    <span className='inline-block col-sm-12'>
                                        <strong>Office Amenities:</strong> <ul>{amenitiesList}</ul>
                                    </span>
                                </div>
                                <div className='row align-items-top justify-between pad-top-25'>
                                    <div className='col-sm-12'>
                                        <h3 className='mrg-btm-25'>Reviews</h3>
                                    </div>
                                    <div className='reviews mrg-btm-25 col-sm-12'>
                                        { reviewList }
                                    </div>
                                    <div className='compose col-sm-12'>
                                        <Compose therapist={therapist_id} />
                                    </div>
                                </div>
                            </div>
                        : null
                    }
                </div>
            </div>
        );
    }
}



export default Therapist;