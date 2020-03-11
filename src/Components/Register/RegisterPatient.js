import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateState, resetFields, registerUser } from '../../redux/reducers/authReducer';


class RegisterPatient extends Component{
    handleChange = e => {
        let { updateState } = this.props;
        updateState({ [e.target.name]: e.target.value });
    }
    register = () => {
        let { registerUser, username, password, firstName, lastName } = this.props;
        var admin = '';
        registerUser( username, password, firstName, lastName, admin )
        .then()
        .catch( err => console.error(err) );
    }
    render(){
        return(
            <section>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={this.handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={this.handleChange}
                />
                <Link to='/login'>
                    <button
                        onClick={this.register}
                    >
                        Register
                    </button>
                </Link>
            </section>
        );
    }

}

var mapStateToProps = state => {
    let { username, password, firstName, lastName } = state.authReducer;
    return{
        username,
        password,
        firstName,
        lastName
    }
}

export default connect(
    mapStateToProps,
    {
        registerUser,
        updateState,
        resetFields
    }
)(RegisterPatient);