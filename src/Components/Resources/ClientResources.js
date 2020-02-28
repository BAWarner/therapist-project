import React, { Component } from 'react';
import { getTherapistResources } from '../../redux/reducers/resourceReducer';
import { connect } from 'react-redux';
import ClientResource from './ClientResource';

class ClientResources extends Component{
    componentDidMount(){ 
        if ( this.props.userInfo.therapist_info ){
            let { id: therapist_id } = this.props.userInfo.therapist_info;
            this.props.getTherapistResources( therapist_id );
        }       
    }
    render(){
        let mappedResources = this.props.resources.map( (resource, i) => {
            return <ClientResource key={i} resource={resource} />
        })
        return(
            <div>
                Client Resource List
                { mappedResources.length > 0 ? mappedResources : 'Looks like there aren\'t too many resources to see yet'  }
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
export default connect(
    mapStateToProps,
    {
        getTherapistResources
    }
)
(ClientResources);