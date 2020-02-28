import React, { Component } from 'react';

class ClientResource extends Component{
    render(){
        let { name, document, description } = this.props.resource,
            re = /(?:\.([^.]+))?$/,
            extension = re.exec(document),
            imageExtensions = ['jpg', 'jpeg', 'png', 'gif'],
            src;
        if( imageExtensions.includes(extension[1]) ){
            src = document;
        }else{
            src = './placeholder.png';
        }
        return(
            <div>
                <h1>{name}</h1>
                <a href={document} target="_blank">
                    <img src={src} alt='Resource Preview'/>
                </a>
                <p>{description}</p>
            </div>
        );
    }
}

export default ClientResource;