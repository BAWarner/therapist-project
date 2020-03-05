import React, { Component } from 'react';
import AdminCalendar from './AdminCalendar';
import ClientCalendar from './ClientCalendar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { retrieveUser } from '../../redux/reducers/authReducer';

class CalendarViews extends Component{
    render(){
        let { admin, user_id } = this.props.user;
        return(
            <div className='wrap calendar'>
                { 
                    admin
                    ? <AdminCalendar therapist={ user_id } />
                    : <ClientCalendar user={this.props.user} />
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

export default withRouter(
    connect(
        mapStateToProps,
        {
            retrieveUser
        }
    )
    (CalendarViews)
);