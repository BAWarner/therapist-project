import React, { Component } from 'react';
import axios from 'axios';
import { retrieveUser } from '../../redux/reducers/authReducer';
import { getAllTherapists, getAllReviews } from '../../redux/reducers/therapistReducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Compose extends Component{
    constructor(){
        super();
        this.state = {
            rating: 5,
            comment: ''
        }
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = () => {
        let patient_id = this.props.user.user_id;
        let body = {
            ...this.state,
            patient_id,
            therapist_id: this.props.therapist
        }

        axios
        .post('/api/therapists/reviews', body)
        .then( () => {
            this.setState({ rating: 5, comment: '' });
            this.props.getAllTherapists();
            this.props.getAllReviews();
        } )
        .catch( err => console.error(err) );

    }
    componentDidMount(){
        this.props.retrieveUser();
    }
    render(){
        return(
            <div className='compose text-center review'>
                <h4>Leave Your Review Here!</h4>
                <input className='inline-block width-90-p' onChange={ e => this.handleChange(e) } type='range' min='1' max='5' step='0.5' name='rating'/>
                <span className='stars inline-block width-10-p'>{ this.state.rating }</span>
                <textarea className='width-100-p comment-input mrg-btm-25' onChange={ e => this.handleChange(e) } name='comment' placeholder='Review...' value={this.state.comment}></textarea>
                <button onClick={this.handleSubmit}>Submit Review</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    let { user } = state.authReducer;
    return{
        user
    }
}

export default withRouter( connect(
    mapStateToProps,
    {
        retrieveUser,
        getAllTherapists,
        getAllReviews
    }
)
(Compose) )