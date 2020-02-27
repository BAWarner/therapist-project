import React, { Component } from 'react';
import { getAllTherapists, getAllReviews } from '../../redux/reducers/therapistReducer';
import { retrieveUser } from '../../redux/reducers/authReducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Therapist from '../Therapists/Therapist';

class Dashboard extends Component{
    componentDidMount(){
        this.props.getAllTherapists();
        this.props.getAllReviews();
        this.props.retrieveUser();
    }
    render(){
        let { reviews, loading, user} = this.props;
        let therapistsMapped = this.props.therapists.map( (therapist, i) => {
            var therapistReviews = reviews.filter( review => review.therapist_id === therapist.therapist_id );
            return <Therapist key={i} therapist={therapist} reviews={therapistReviews} />
        } );

        return(
            <div className='dashboard'>
                {
                    user.status === 'active'
                    ? <h3>Your Main Therapist: {user.therapist_info.name}</h3>
                    : null
                }
                { loading 
                    ? <img src='https://resources.humandx.org/static/img/loading_spinner.gif' alt='loading'/> 
                    : therapistsMapped 
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    let { therapists, loading, reviews } = state.therapistReducer;
    let { user } = state.authReducer;
    return{
        therapists,
        reviews,
        user,
        loading
    }
}

export default withRouter(connect(
    mapStateToProps,
    {
        getAllTherapists,
        getAllReviews,
        retrieveUser
    }
)(Dashboard));