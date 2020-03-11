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
            <div className='singleResource card col-sm-12 col-md-4'>
                <a href={document} target="_blank">
                    <div className='inner-card'>
                        <h1>{name}</h1>
                        <img 
                            src={src}
                            alt='Resource Preview'
                            className='mrg-top-25 mrg-btm-25'
                        />
                        <p>{description}</p>
                    </div>
                </a>
            </div>
        );
    }
}

export default ClientResource;