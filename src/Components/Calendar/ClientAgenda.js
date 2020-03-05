import React, { Component } from 'react';

class ClientAgenda extends Component{
    render(){
        let { start, endapt } = this.props.appointment,
            { name } = this.props.therapist;
        let begin = new Date(start),
            end = new Date(endapt),
            beginString = begin.toDateString(),
            beginH = begin.getHours(),
            beginM = begin.getMinutes(),
            endH = end.getHours(),
            endM = end.getMinutes();
        return(
            <div className='agenda'>
                <h4>{beginString}</h4>
                {`${beginH}:${beginM} - ${endH}:${endM}`}
                { name }
            </div>
        );
    }
}

export default ClientAgenda;