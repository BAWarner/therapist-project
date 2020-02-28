import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut, retrieveUser } from '../../redux/reducers/authReducer';

class Navigation extends Component{
    componentDidMount(){
        this.props.retrieveUser();
    }
    logOut = () => {
        this.props.logOut()
        .then(
            () => {
                this.props.history.push('/');
            }
        );
    }
    render(){
        let { user_id } = this.props.user;
        var logoLink;
        user_id ? logoLink = '/home' : logoLink = '/';
        return(
            <div className='wrap nav'>
                <div className='wrap logo'>
                    <Link to={logoLink}>
                        <img src='' alt='logo'/>
                    </Link>
                </div>
                <nav>
                    <ul>
                        <li>
                            {
                                user_id
                                    ?
                                        <button
                                            onClick={this.logOut}
                                        >
                                            Log Out
                                        </button>
                                    :
                                        <Link to='/login'>
                                            Log In
                                        </Link>
                            }
                            
                        </li>
                        <li>
                            <Link to='/profile'>
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link to='/resources'>
                                Resources
                            </Link>
                        </li>
                        <li>
                            <Link to='/calendar'>
                                Calendar
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = state => {
    let { user } = state.authReducer
    return{
        user
    }
}

export default withRouter(connect(
    mapStateToProps,
    {
        logOut,
        retrieveUser
    }
)
(Navigation));