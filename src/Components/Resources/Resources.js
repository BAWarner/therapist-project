import React, { Component } from 'react';
import { connect } from 'react-redux';
import { retrieveUser } from '../../redux/reducers/authReducer';
import TherapistResources from './TherapistSide';
import ClientResources from './ClientSide';

class Resources extends Component{
    componentDidMount(){
        this.props.retrieveUser();
    }
    render(){
        let { admin } = this.props.user;

        return(
            <div className='wrap resources'>
                {    
                    admin 
                    ?
                        <TherapistResources userInfo={this.props.user} />
                    :
                        <ClientResources userInfo={this.props.user} />
                }
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

export default connect(
    mapStateToProps,
    {
        retrieveUser
    }
)
(Resources);