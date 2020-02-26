import React, { Component } from 'react';
import { getAllTherapists, getAllReviews } from '../../redux/reducers/therapistReducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Therapist from '../Therapists/Therapist';

class Dashboard extends Component{
    componentDidMount(){
        this.props.getAllTherapists();
        this.props.getAllReviews();
    }
    render(){
        let { reviews, loading} = this.props;
        let therapistsMapped = this.props.therapists.map( (therapist, i) => {
            var therapistReviews = reviews.filter( review => review.therapist_id === therapist.therapist_id );
            return <Therapist key={i} therapist={therapist} reviews={therapistReviews} />
        } );

        return(
            <div className='dashboard'>
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
    return{
        therapists,
        reviews,
        loading
    }
}

export default withRouter(connect(
    mapStateToProps,
    {
        getAllTherapists,
        getAllReviews
    }
)(Dashboard));