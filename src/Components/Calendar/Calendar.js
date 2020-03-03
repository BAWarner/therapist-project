import React, { Component } from 'react';
const CONFIG = require('./settings/settings');
const CalendarAPI = require('node-google-calendar');

class Calendar extends Component{
    render(){
        let calendar = new CalendarAPI(CONFIG);
        let params = { 
            timeMin: '2020-02-01:00:00-07:00',
            timeMax: '2020-04-01:00:00-07:00',
            q: 'query_term',
            singleEvents: true,
            orderBy: 'startTime'
        },
        calendarId = CONFIG.calendarId["primary"];

        calendar.Events.list(calendarId, params)
        .then( res => console.log(res) )
        .catch( err => console.log(err.message) )
        return(
            <div className='wrap calendar'>
                
            </div>
        );
    }
}

export default Calendar;
