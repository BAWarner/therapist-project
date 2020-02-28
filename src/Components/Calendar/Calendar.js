import React, { Component } from 'react';
require('dotenv').config();


class Calendar extends Component{
    
    constructor(){
        super();
        this.state = {
            events: []
        }
    }

    componentDidMount(){
        this.getEvents();
    }
    
    getEvents = () => {
        let { REACT_APP_googleApi, REACT_APP_googleCalendar } = process.env,
            that = this;
        const start = () => {
            window.gapi.client.init({
                'apikey': REACT_APP_googleApi
            })
            .then( () => {
                return window.gapi.client.request({
                    'path': `https://www.googleapis.com/calendar/v3/calendars/${REACT_APP_googleCalendar}/events`
                })
            } )
            .then( 
                res => {
                    let events = res.results.items;
                    that.setState( { events }, () => console.log(that.state.events) )
                },
                function(reason){
                    console.log(reason);
                }
            );
        }
        window.gapi.load('client', start);
    }

    render(){
        return(
            <div className='wrap calendar'>
                <h1>Calendar...coming soon....</h1>
            </div>
        );
    }
}

export default Calendar;