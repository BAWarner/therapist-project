import React, { Component } from 'react';

class Resource extends Component{
    constructor(){
        super();
        this.state = {
            resource_id: null,
            name: '',
            document: '',
            description: '',
            showEdit: false
        }
    }
    componentDidMount(){
        let { resource_id, name, document, description } = this.props.resource;
        this.setState({
            resource_id,
            name,
            document,
            description
        })
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleUpdate = () => {
        let { resource_id, name, document, description } = this.state;
        this.props.handleUpdate(resource_id, name, document, description);
        this.setState({ showEdit: false })
    }
    toggleEdit = () => {
        this.setState({ showEdit: !this.state.showEdit });
    }
    checkUploadResult = (error, result) => {
        let { event, info} = result;
        if( event === 'success' ){
            console.log('Party on, Wayne!');
            this.setState({document: info.url});
        }
    }
    render(){
        let { name, document, description } = this.state,
            re = /(?:\.([^.]+))?$/,
            extension = re.exec(document),
            imageExtensions = ['jpg', 'jpeg', 'png', 'gif'],
            src;
        if( imageExtensions.includes(extension[1]) ){
            src = document;
        }else{
            src = './placeholder.png';
        }
        let widget;
        if( window.cloudinary ){
            widget = window.cloudinary.createUploadWidget(
                {
                    cloudName: this.props.cloud,
                    uploadPreset: this.props.preset,
                    sources: ['local, url'],
                    Default: false
                },
                (error, result) => {
                    this.checkUploadResult(error, result);
                }
            );
        }

        return(
            <div>
                {
                    this.state.showEdit
                    ?
                        <div>
                            <input onChange={ e => this.handleChange(e) } type='text' name='name' value={name}/>
                            <button onClick={ () => widget.open() }>Edit Document Link</button>
                            <textarea onChange={ e => this.handleChange(e) } name='description'>{description}</textarea>
                            <button onClick={ this.toggleEdit }>Cancel</button>
                            <button onClick={ this.handleUpdate }>Update</button>
                        </div>
                    :
                        <div>
                            <h3>{name}</h3>
                            <a href={document} target='_blank'>
                                <img src={src} alt='Resource preview' />
                            </a>
                            <p>{description}</p>
                            <button onClick={ this.toggleEdit }>Edit Resource</button>
                        </div>
                        
                
                }
            </div>
        );
    }
}

export default Resource;