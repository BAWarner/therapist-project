import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { retrieveUser, updatePatient, updateState } from '../../redux/reducers/authReducer';
require("dotenv").config();

class Profile extends Component{
    constructor(){
        super();
        this.state = {
            showEdit: false,
            username: '',
            firstname: '',
            lastname: '',
            emailaddress: '',
            profile_image: ''
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleUpdate = () => {
        let { updatePatient, user } = this.props;
        let {firstname, lastname, emailaddress, profile_image, showEdit} = this.state;
        let userInfo = {
            user_id: user.user_id,
            username: this.props.user.username,
            firstname,
            lastname,
            emailaddress,
            profile_image
        }
        updatePatient(userInfo);
        this.setState({ showEdit: !showEdit })
    }
    toggleEdit = () => {
        let { showEdit } = this.state;
        this.setState({ showEdit: !showEdit })
    }
    componentDidMount(){
        this.props.retrieveUser();
        let { username, firstname, lastname, emailaddress, profile_image } = this.props.user;
        this.setState({
            username,
            firstname,
            lastname,
            emailaddress,
            profile_image
        });
    }
    checkUploadResult = (error, result) => {
        let { event, info } = result ;
        if(event === 'success'){
            console.log('Party on, Wayne!');
            this.setState({ profile_image: info.url });
        }
    }
    
    render(){
        let { username, firstname, lastname, emailaddress, profile_image } = this.state;
        const { REACT_APP_cloudName, REACT_APP_cloudinary_unsigned } = process.env;
        let widget;
        if( window.cloudinary ) {
            widget = window.cloudinary.createUploadWidget(
                {
                    cloudName: `${REACT_APP_cloudName}`,
                    uploadPreset: `${REACT_APP_cloudinary_unsigned}`,
                    sources: ['local', 'url', 'facebook', 'instagram'],
                    Default: false
                },
                ( error, result ) => {
                    this.checkUploadResult(error, result);
                }
            );
        }
        return(
            <div className='wrap profile'>
                <h1>{username}'s Profile</h1>
                <button onClick={this.toggleEdit}>Edit Profile</button>
                { 
                    this.state.showEdit === false
                        ?
                        <section className='wrap display'>
                            <img
                                src={ profile_image ? profile_image : 'https://www.fillmurray.com/300/200' } alt='profile picture'
                            />
                            <h3>{`${firstname} ${lastname}`}</h3>
                            <h3>{emailaddress ? emailaddress : null}</h3>
                        </section>
                        :
                        <section className='wrap form'>
                            <input
                                type='text'
                                name='firstname'
                                value={firstname}
                                onChange={this.handleChange}
                            />
                            <input
                                type='text'
                                name='lastname'
                                value={lastname}
                                onChange={this.handleChange}
                            />
                            <input
                                type='text'
                                name='emailaddress'
                                value={emailaddress}
                                onChange={this.handleChange}
                            />
                            <button name='profile_image' onClick={ () => widget.open() }>Upload Profile Image</button>
                            <button onClick={this.handleUpdate}>Update Profile</button>
                        </section>
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

export default withRouter(connect(
    mapStateToProps,
    {
        retrieveUser,
        updatePatient,
        updateState
    }
)

(Profile));