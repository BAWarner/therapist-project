require('dotenv').config();
const path = require('path');
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
app.use( express.static( `${__dirname}/../build` ) );

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen( SERVER_PORT, () => console.log('Party on, Wayne!') );

// AUTH
var authCtrl = require('./controllers/authController.js');
let { register, login, logout, retrieveUser, handleStripe } = authCtrl;

app.post('/auth/register/:type?', register);
app.get('/auth/logout', logout);
app.post('/auth/login', login);
app.get('/auth/retrieve', retrieveUser);
app.post('/auth/handleStripe', handleStripe);


// Therapist
var therapistCtrl = require('./controllers/therapistController');
let { getAllTherapists, getOverallRatings, getAllReviews, postReview, 
    getPatientList, changePatientStatus, addNewAppointment,
    getTherapistAppointments, updateAppointment, getExtraInfo } = therapistCtrl;

app.get('/api/therapists', getAllTherapists);
app.get('/api/therapists/ratings/:id', getOverallRatings);
app.get('/api/therapists/reviews', getAllReviews);
app.post('/api/therapists/reviews', postReview);
app.get('/api/therapists/patients/:id', getPatientList);
app.put('/api/therapists/patients/:id', changePatientStatus);
app.post('/api/therapists/appointments/:id', addNewAppointment);
app.get('/api/therapists/appointments/:id', getTherapistAppointments);
app.put('/api/therapists/appointments/:id', updateAppointment);
app.get('/api/therapists/extras/:id', getExtraInfo);

// Resources
var resourceCtrl = require('./controllers/resourceController');
let { getAllResources, getTherapistResources, addResource, updateResource, deleteResource } = resourceCtrl;

app.get('/api/resources', getAllResources);
app.get('/api/resources/:id', getTherapistResources);
app.post('/api/resources/:id', addResource);
app.put('/api/resources/:id', updateResource);
app.delete('/api/resources/:id', deleteResource);

// Patient
var patientCtrl = require('./controllers/patientController');
let { updatePatient, getAppointments, getContact, updateAssignment } = patientCtrl;

app.put('/api/patients/assignments', updateAssignment);
app.put('/api/patients/:id', updatePatient);
app.get('/api/patients/appointments/:id', getAppointments);
app.get('/api/patients/contact/:id', getContact);