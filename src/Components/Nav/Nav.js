import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut, retrieveUser } from '../../redux/reducers/authReducer';
import Register from '../Register/Register';

class Navigation extends Component{
    constructor(){
        super();
        this.state = {
            landing: false
        }
    }
    componentDidUpdate(prevProps, prevState){
        if( prevProps.location.pathname !== this.props.location.pathname){
            if(this.props.location.pathname === '/'){
                this.setState({ landing: true })  
            } else{
                this.setState({ landing: false })
            }
        }
    }
    componentDidMount(){
        this.props.retrieveUser();
        this.setState({ landing: true })
    }
    logOut = () => {
        this.props.logOut();
        this.props.history.push('/');
        
    }
    render(){
        let { user_id } = this.props.user;
        var logoLink,
            addClass;
        var boxShadow;
        user_id ? logoLink = '/home' : logoLink = '/';
        user_id ? boxShadow = 'box-shadow nav-mrg' :  boxShadow = '';
        let { landing } = this.state;
        landing ? addClass = 'landing' : addClass = 'relative z-index-10';
        return(
            <div className={`${addClass} ${boxShadow} bg-white nav-wrap`}>
                { landing ? <div className='overlay'></div> : null }
                <div className='wrap row height-100-p'>
                    <div className='col-sm-3 pad-top-10 pad-btm-15 height-fit-content relative z-index-2'>
                        <Link to={logoLink}>
                            <span className='logo'>TF</span>
                        </Link>
                    </div>
                    <nav className='col-sm-9 relative z-index-2'>
                        <ul className='flex align-items-middle justify-evenly reverse'>
                            <li>
                                {
                                    user_id
                                        ?
                                            <button
                                                onClick={this.logOut}
                                                className='hollow small'
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
                    {
                        landing
                        ?
                        <div className='col-sm-12 text-center white relative z-index-2'>
                            <h1>Therapist Finder</h1>
                            <h4>Helping you find the best fit for your needs</h4>
                            <Register landing={true}/>
                        </div>
                        : null
                    }
                    
                </div>
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