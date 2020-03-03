const 
key = require('./calendarkey.json').private_key,
SERVICE_ACCT_ID = 'therapist-calendar@therapist-finder-269521.iam.gserviceaccount.com',
TIMEZONE = 'UTC-07:00',
CALENDAR_ID = {
    'primary': 'dn255gsudpe7dq08hp05c3a1fs@group.calendar.google.com'
},
CALENDAR_URL ='https://calendar.google.com/calendar/embed?src=dn255gsudpe7dq08hp05c3a1fs%40group.calendar.google.com&ctz=America%2FDenver';



module.exports.key = key;
module.exports.serviceAcctId = SERVICE_ACCT_ID;
module.exports.timezone = TIMEZONE;
module.exports.calendarId = CALENDAR_ID;
module.exports.calendarUrl = CALENDAR_URL;