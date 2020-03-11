import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { updateState, resetFields, loginUser } from '../redux/reducers/authReducer';

class Login extends Component{
    handleChange = e => {
        let { updateState } = this.props;
        updateState({ [e.target.name]: e.target.value })
    }
    login = () => {
        let { loginUser, username, password } = this.props;
        loginUser(username, password)
        .catch( err => console.error(err) );
    }
    handleKeyPress = e => {
        if(e.key == 'Enter'){
            let { username, password } = this.props;
            if(username && password ){
                this.login();
            }
        }
    }
    render(){

        if (this.props.user.user_id) return <Redirect to='/home' />

        return(
            <div className='bg-cover height-100-vh-calc bg-face'>
                <div className='overlay light'></div>
                <div className='wrap row height-100-p z-index-2 align-items-middle justify-center'>
                    <div className='col col-sm-12 col-md-5 bg-white block login-wrap pad-55 text-center'>
                        <h4>Login</h4>
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
                            onKeyPress={this.handleKeyPress}
                        />

                        <button
                            onClick={this.login}
                        >
                            Log In
                        </button>

                        <span className='block pad-top-25'>
                            Don't have an account?&nbsp;
                            <Link
                                to='/register'
                            >
                                Click Here&nbsp;
                            </Link> 
                            to register
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    let{ username, password, user } = state.authReducer;

    return{
        user,
        username,
        password
    }
}

export default withRouter(connect(
    mapStateToProps,
    {
        updateState,
        resetFields,
        loginUser
    }
)(Login));