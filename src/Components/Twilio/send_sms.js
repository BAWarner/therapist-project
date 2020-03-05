require('dotenv').config();
const accountSid = process.env.REACT_APP_TWILIO_SID;
const authToken = process.env.REACT_APP_TWILIO_AUTH;
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
        from: '+12055393394',
        to: '+18014715137'
    })
    .then(message => console.log(message.sid));