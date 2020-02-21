require('dotenv').config();
let { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env;

const express = require('express');
const app = express();
const session = require('express-session');

const massive = require('massive');

app.listen( SERVER_PORT, () => console.log('Party on, Wayne!') );

massive(CONNECTION_STRING)
.then( db => {
    console.log('Excellent!');
    app.set('db', db);
} 
)
.catch( err => console.error(err) );

session({
    saveUninitialized: true,
    resave: false,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }

})