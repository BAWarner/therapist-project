import React, { Component } from 'react';

function ClientAgenda(props){

    let { start, endapt } = props.appointment,
        { name } = props.therapist;
    let begin = new Date(start),
        end = new Date(endapt),
        beginString = begin.toDateString(),
        beginH = begin.getHours(),
        beginM = begin.getMinutes(),
        endH = end.getHours(),
        endM = end.getMinutes();
    return(
        <div className='agenda pad-top-25'>
            <h4 className='no-mrg'>{beginString}</h4>
            <span className='block mrg-btm-10'>{`${beginH}:${beginM} - ${endH}:${endM}`}</span>
            <span className='block'>{ name }</span>
        </div>
    );
}

export default ClientAgenda;