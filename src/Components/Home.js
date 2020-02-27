import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { retrieveUser } from '../redux/reducers/authReducer';
import AdminPanel from './Dashboard/AdminPanel';
import Dashboard from './Dashboard/Dashboard';

class Home extends Component{
    componentDidMount(){
        this.props.retrieveUser();
    }
    render(){
        let { user_id, admin } = this.props.user;
        var loggedInDisp;
        
        if(admin){
            loggedInDisp = (
                <div className='wrap main'>
                    <AdminPanel />
                </div>
            )
        }else{
            loggedInDisp = (
                <div className='wrap main'>
                    <Dashboard />
                </div>
            )
        }
        
        return loggedInDisp;

        // return user_id ? loggedInDisp : <Redirect to='/' />
        
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
(Home);