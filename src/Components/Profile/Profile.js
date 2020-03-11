import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { retrieveUser, updatePatient, updateState } from '../../redux/reducers/authReducer';
import axios from 'axios';
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
            profile_image: '',
            about: '',
            education: '',
            specialties: [],
            methods: [],
            amenities: []
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
            profile_image,
            admin: this.props.user.admin
        }
        updatePatient(userInfo);
        this.setState({ showEdit: !showEdit })
    }
    toggleEdit = () => {
        let { showEdit } = this.state;
        this.setState({ showEdit: !showEdit })
    }
    handleChecked = e => {
        console.log(e.target.name, e.target.value);
    }
    componentDidMount(){
        this.props.retrieveUser();
        if( this.props.user.admin ){
            axios
            .get(`/api/therapists/extras/${this.props.user.user_id}`)
            .then( res => {
                let { username, firstname, lastname, emailaddress, about, profile_image } = this.props.user;
                let { specialties, amenities, methods } = res.data;
                this.setState({
                    username,
                    firstname,
                    lastname,
                    emailaddress,
                    profile_image,
                    about,
                    specialties,
                    methods,
                    amenities
                });
            } )
            .catch( err => console.error(err) )
        }else{
            let { username, firstname, lastname, emailaddress, profile_image } = this.props.user;
            this.setState({
                username,
                firstname,
                lastname,
                emailaddress,
                profile_image
            });
        }
        
    }
    checkUploadResult = (error, result) => {
        let { event, info } = result;
        if(event === 'success'){
            this.setState({ profile_image: info.url });
        }
    }
    
    render(){
        let { username, firstname, lastname, emailaddress, 
            profile_image, about, specialties, methods, amenities } = this.state;
        const { REACT_APP_cloudName, REACT_APP_cloudinary_unsigned } = process.env;
        let widget;
        var specialtiesCheck, specialtiesList,
            amenitiesCheck, amenitiesList,
            methodsCheck, methodsList;
            
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
        if( specialties.length > 0 ){
            specialtiesCheck = specialties.map( (specialty, i) => { 
                return (
                    <label key={i} htmlFor={specialty.abbreviation} className='block mrg-btm-10'>
                        <input type='checkbox' onChange={ e => this.handleChecked(e) } id={specialty.abbreviation} name='specialties' value={specialty.abbreviation} />
                        {specialty.name}
                    </label>
                )
            });
            specialtiesList = specialties.map( (specialty, i) => { 
                return (
                    <li key={i}>
                        {specialty.name}, {`(${specialty.abbreviation})`}
                    </li>
                )
            })
        }
        if( amenities.length > 0 ){
            amenitiesCheck = amenities.map( (amenity, i) => { 
                return (
                    <label key={i} htmlFor={amenity.name} className='block mrg-btm-10'>
                        <input type='checkbox' onChange={ e => this.handleChecked(e) } id={amenity.name} name='amenities' value={amenity.name} />
                        {amenity.name}
                    </label>
                )
            });
            amenitiesList = amenities.map( (amenity, i) => { 
                return (
                    <li key={i}>
                        {amenity.name}
                    </li>
                )
            });
        }
        if( methods.length > 0 ){
            methodsCheck = methods.map( (method, i) => { 
                return (
                    <label key={i} htmlFor={method.name} className='block mrg-btm-10'>
                        <input type='checkbox' onChange={ e => this.handleChecked(e) } id={method.name} name='methods' value={method.name} />
                        {method.name}
                    </label>
                )
            });
            methodsList = methods.map( (method, i) => { 
                return (
                    <li key={i}>
                        {method.name}
                    </li>
                )
            });
        }
        return(
            <div className='wrap profile pad-left-25 pad-right-25'>
                <h1 className='no-mrg'>{username}'s Profile</h1>
                <button className='mrg-top-25 mrg-btm-25 small hollow' onClick={this.toggleEdit}>
                    { this.state.showEdit
                        ? 'Cancel'
                        : 'Edit Profile'
                    }
                </button>
                { 
                    this.state.showEdit === false
                        ?
                        <section className='wrap display'>
                            <div className='row align-items-top justify-between'>
                                <div className='col-sm-12 col-md-6'>
                                    <h3>{`${firstname} ${lastname}`}</h3>
                                    <h3>{emailaddress ? emailaddress : null}</h3>
                                    {
                                        this.props.user.admin
                                        ?
                                            <div className='row align-items-top justify-between'>
                                                <div className='col-sm-12'>
                                                    {about}
                                                </div>
                                                <div className='col-sm-12'>
                                                    <h4>Specialties</h4> 
                                                    <ul>
                                                        {specialtiesList}
                                                    </ul>
                                                </div>

                                                <div className='col-sm-12'>
                                                    <h4>Methods</h4> 
                                                    <ul>
                                                        {methodsList}
                                                    </ul>
                                                </div>
                                                <div className='col-sm-12'>
                                                    <h4>Office Amenities</h4> 
                                                    <ul>
                                                        {amenitiesList}
                                                    </ul>
                                                </div>
                                            </div>
                                        : null
                                    }
                                </div>
                                <div className='col-sm-12 col-md-6'>
                                    <img
                                        src={ profile_image ? profile_image : 'https://www.fillmurray.com/300/200' } alt='profile'
                                    />
                                </div>
                            </div>
                        </section>
                        :
                        <section className='wrap form row align-items-top justify-evenly'>
                            <div className='col-sm-12 col-md-4 no-pad pad-btm-55'>
                                <input
                                    type='text'
                                    name='firstname'
                                    placeholder='First Name'
                                    value={firstname}
                                    onChange={this.handleChange}
                                />
                                <input
                                    type='text'
                                    name='lastname'
                                    placeholder='Last Name'
                                    value={lastname}
                                    onChange={this.handleChange}
                                />
                                <input
                                    type='text'
                                    name='emailaddress'
                                    placeholder='Email Address'
                                    value={emailaddress}
                                    onChange={this.handleChange}
                                />
                            </div>
                            {
                                this.props.user.admin
                                ?
                                    <div className='col-sm-12 col-md-5'>
                                        <textarea
                                            className='width-100-p mrg-btm-25'
                                            name='about'
                                            value={about}
                                            placeholder='A little bit about you'
                                            onChange={this.handleChange}
                                        >
                                        </textarea>
                                        {
                                            specialtiesCheck 
                                            ? 
                                                <div className='mrg-btm-25'>
                                                    <h3>Specialties</h3>
                                                    {specialtiesCheck}
                                                </div>
                                            : null
                                        }
                                        {
                                            methodsCheck 
                                            ? 
                                                <div className='mrg-btm-25'>
                                                    <h3>Methods</h3>
                                                    {methodsCheck}
                                                </div> 
                                            : null
                                        }
                                        {
                                            amenitiesCheck 
                                            ? 
                                                <div className='mrg-btm-25'>
                                                    <h3>Amenities</h3>
                                                    {amenitiesCheck}
                                                </div> 
                                            : null
                                        }
                                    </div>
                                : null
                            }
                            <div className='col-sm-12 col-md-3 no-pad'>
                                <img 
                                    src={ profile_image ? profile_image : 'https://www.fillmurray.com/300/200' }
                                    alt='profile preview'
                                />
                                <button className='mrg-top-25' name='profile_image' onClick={ () => widget.open() }>Upload Profile Image</button>
                            </div>
                            <div className='col-sm-12 pad-top-25'>
                                <button className='small mrg-right-25' onClick={this.handleUpdate}>Update Profile</button>
                                <button className='small hollow' onClick={this.toggleEdit}>Cancel</button>
                            </div>
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