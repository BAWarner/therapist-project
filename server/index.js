require('dotenv').config();
let { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env;

const express = require('express');
const app = express();
const session = require('express-session');

const massive = require('massive');

const cors = require('cors');

app.use(cors());

app.use(express.json());

massive(CONNECTION_STRING)
.then( db => {
    console.log('Excellent!');
    app.set('db', db);
} 
)
.catch( err => console.error(err) );

app.use(
    session({
        saveUninitialized: true,
        resave: false,
        secret: SESSION_SECRET,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7
        }

    })
);

app.listen( SERVER_PORT, () => console.log('Party on, Wayne!') );

// AUTH
var authCtrl = require('./controllers/authController.js');
let { register, login, logout, retrieveUser } = authCtrl;

app.post('/auth/register/:type?', register);
app.get('/auth/logout', logout);
app.post('/auth/login', login);
app.get('/auth/retrieve', retrieveUser);


// Therapist
var therapistCtrl = require('./controllers/therapistController');
let { getAllTherapists, getOverallRatings, getAllReviews, postReview, getTherapistSpecialties } = therapistCtrl;

app.get('/api/therapists', getAllTherapists);
app.get('/api/therapists/ratings/:id', getOverallRatings);
app.get('/api/therapists/reviews', getAllReviews);
app.post('/api/therapists/reviews', postReview);
app.get('/api/therapists/specialties/:id', getTherapistSpecialties);

// Resources
var resourceCtrl = require('./controllers/resourceController');
let { getAllResources } = resourceCtrl;

app.get('/api/resources', getAllResources);

// Patient
var patientCtrl = require('./controllers/patientController');
let { updatePatient } = patientCtrl;

app.put('/api/patients/:id', updatePatient);
