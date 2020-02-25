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
        .then( res => {
            console.log(res.data);
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
            <div className='compose review'>
                <input onChange={ e => this.handleChange(e) } type='range' min='1' max='5' step='0.5' name='rating'/>
                <span className='stars'>{ this.state.rating }</span>
                <textarea onChange={ e => this.handleChange(e) } name='comment' value={this.state.comment}></textarea>
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