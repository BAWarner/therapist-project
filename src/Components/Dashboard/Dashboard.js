import React, { Component } from 'react';
import { getTherapists } from '../../redux/reducers/therapistReducer';
import { connect } from 'react-redux';
import { withRoutes } from 'react-router-dom';

class Dashboard extends Component{
    componentDidMount(){
        this.props.getAllTherapists();
    }
    render(){
        return(
            <div className='dashboard'>
                <h1>Regular Dash</h1>
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

export default withRoutes(connect(
    mapStateToProps,
    {
        getAllTherapists
    }
)(Dashboard));