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
        let { loading } = this.props;
        let therapistsMapped = this.props.therapists.map( (therapist, i) => {
            return <Therapist key={i} therapist={therapist} />
        } );

        return(
            <div className='dashboard'>
                <h1>Regular Dash</h1>

                { loading 
                    ? <img src='https://resources.humandx.org/static/img/loading_spinner.gif' alt='loading'/> 
                    : therapistsMapped 
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    let { therapists, loading } = state.therapistReducer;
    return{
        therapists,
        loading
    }
}

export default withRouter(connect(
    mapStateToProps,
    {
        getAllTherapists
    }
)(Dashboard));