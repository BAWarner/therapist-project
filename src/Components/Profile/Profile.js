import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { retrieveUser, updatePatient, updateState } from '../../redux/reducers/authReducer';

class Profile extends Component{
    constructor(){
        super();
        this.state = {
            showEdit: false
        }
    }

    handleChange = e => {
        this.props.updateState({ [e.target.name]: e.target.value });
    }

    handleUpdate = () => {
        let { updatePatient, user } = this.props;
        console.log(user);
        // updatePatient(user);
        this.setState({ showEdit: !this.state.showEdit })
    }
    toggleEdit = () => {
        let { showEdit } = this.state;
        this.setState({ showEdit: !showEdit })
    }
    componentDidMount(){
        this.props.retrieveUser();
    }
    
    render(){
        let { username, firstname, lastname, emailaddress, profile_image } = this.props.user;
        return(
            <div className='wrap profile'>
                <h1>{username}'s Profile</h1>
                <button onClick={this.toggleEdit}>Edit Profile</button>
                { 
                    this.state.showEdit === false
                        ?
                        <section className='wrap display'>
                            <img
                                src={ profile_image ? profile_image : 'https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png' } alt='profile picture'
                            />
                            <h3>{`${firstname} ${lastname}`}</h3>
                            <h3>{`${emailaddress}`}</h3>
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
                            {
                                profile_image 
                                ?
                                    <input
                                        type='text'
                                        name='profile_image'
                                        value={profile_image}
                                        onChange={this.handleChange}
                                    />
                                :
                                    <input
                                        type='text'
                                        name='profile_image'
                                        placeholder='URL to Profile Image'
                                        onChange={this.handleChange}
                                    />
                            }
                            
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