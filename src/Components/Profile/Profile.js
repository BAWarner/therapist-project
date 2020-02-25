import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { retrieveUser } from '../../redux/reducers/authReducer';

class Profile extends Component{

    componentDidMount(){
        this.props.retrieveUser();
    }

    render(){
        console.log(this.props.user);
        return(
            <div className='wrap profile'>
                <h1>Profile</h1>
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

export default withRouter(connect(
    mapStateToProps,
    {
        retrieveUser
    }
)

(Profile));