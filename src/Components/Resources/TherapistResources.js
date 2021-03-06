import React, { Component } from 'react';
import { addResource, getTherapistResources, updateResource, deleteResource } from '../../redux/reducers/resourceReducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TherapistResource from './TherapistResource';
require('dotenv').config();

class TherapistResources extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            document: '',
            description: '',
            showAdd: false
        }
    }
    handleSubmit = () => {
        let { addResource } = this.props,
            { user_id: therapist_id } = this.props.userInfo,
            { name, document, description } = this.state;

        addResource(therapist_id, name, document, description);
        this.setState({ name: '', document: '', description: '', showAdd: false });
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleUpdate = (resource_id, name, document, description) => {
        let { user_id: therapist_id } = this.props.userInfo;
        this.props.updateResource( resource_id, name, document, description, therapist_id );
    }
    handleDelete = resource_id => {
        let { user_id: therapist_id } = this.props.userInfo;
        this.props.deleteResource( resource_id, therapist_id );
    }
    toggleAdd = () => {
        this.setState({ showAdd: !this.state.showAdd });
    }
    checkUploadResult = (error, result) => {
        let { event, info} = result;
        if( event === 'success' ){
            console.log('Party on, Wayne!');
            this.setState({document: info.url});
        }
    }
    componentDidMount(){
        let { user_id: therapist_id } = this.props.userInfo;
        this.props.getTherapistResources(therapist_id);
    }
    render(){
        const { REACT_APP_cloudName, REACT_APP_cloudinary_unsigned } = process.env;
        let mappedResources = this.props.resources.map( (resource, i) => {
            return (<TherapistResource
                        key={i}
                        resource={resource}
                        handleUpdate={this.handleUpdate}
                        handleDelete={this.handleDelete}
                        cloud={REACT_APP_cloudName}
                        preset={REACT_APP_cloudinary_unsigned}
                    />);
        } );
        let widget;
        if( window.cloudinary ){
            widget = window.cloudinary.createUploadWidget(
                {
                    cloudName: REACT_APP_cloudName,
                    uploadPreset: REACT_APP_cloudinary_unsigned,
                    sources: ['local, url'],
                    Default: false
                },
                (error, result) => {
                    this.checkUploadResult(error, result);
                }
            );
        }
        return(
            <div className='row align-items-top justify-between'>
                <div className='col-sm-12 mrg-btm-25'>
                    <button onClick={ this.toggleAdd }>Add New Resource</button>
                </div>
                {
                    this.state.showAdd
                        ?
                            <section className='lightbox admin resource'>
                                <div className='overlay'></div>
                                <div className='form'>
                                    <button className='small cancel' onClick={ this.toggleAdd }>Cancel</button>
                                    <input type='text' name='name' placeholder='Title of Document' onChange={e => this.handleChange(e)}/>
                                    <button name='document' onClick={ () => widget.open() }>Upload Document</button>
                                    <textarea
                                        placeholder='Document Description...' 
                                        name='description' 
                                        onChange={e => this.handleChange(e)}
                                        className='width-100-p mrg-top-25 mrg-btm-25'
                                    ></textarea>
                                    <button onClick={this.handleSubmit}>Submit</button>
                                </div>
                            </section>
                        : null
                }
                { mappedResources.length > 0 ? mappedResources : 'Doesn\'t look like you have any resources available. Maybe try adding one.' }
            </div>
        );
    }
}

const mapStateToProps = state => {
    let { resources } = state.resourceReducer;
    return{
        resources
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        {
            addResource,
            getTherapistResources,
            updateResource,
            deleteResource
        }
    )
    (TherapistResources)
);