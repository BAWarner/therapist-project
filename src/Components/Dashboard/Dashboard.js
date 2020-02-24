import React, { Component } from 'react';
import { getAllTherapists } from '../../redux/reducers/therapistReducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Therapist from '../Therapists/Therapist';

class Dashboard extends Component{
    componentDidMount(){
        this.props.getAllTherapists();
    }
    render(){
        let therapistsMapped = this.props.therapists.map( therapist => {
            return <Therapist therapist={therapist} />
        } );

        return(
            <div className='dashboard'>
                <h1>Regular Dash</h1>
                { therapistsMapped }
            </div>
        );
    }
}

const mapStateToProps = state => {
    let { therapists } = state.therapistReducer;
    return{
        therapists
    }
}

export default withRouter(connect(
    mapStateToProps,
    {
        getAllTherapists
    }
)(Dashboard));