var getAllTherapists = async (req, res) => {
    var db = req.app.get('db');
    var therapists = await db.therapists.getAllTherapists();
    
    res
    .status(200)
    .send(therapists);
}

var getOverallRatings = async (req, res) => {
    var db = req.app.get('db');
    let therapist_id = req.params.id;

    var ratings = await db.therapists.getOverallRatings(therapist_id);

    res
    .status(200)
    .send(ratings);
}

var getAllReviews = async (req, res) => {
    var db = req.app.get('db');
    var reviews = await db.therapists.getAllReviews();

    res
    .status(200)
    .send(reviews)
}

var postReview = async (req, res) => {
    var db = req.app.get('db');
    let { patient_id, therapist_id, rating, comment } = req.body;

    await db.therapists.postReview( patient_id, therapist_id, rating, comment );

    res
    .sendStatus(200);
}

var getTherapistSpecialties =  async (req, res) => {
    var db = req.app.get('db');
    let therapist_id = req.params.id;
    var specialties = await db.therapists.getTherapistSpecialties( therapist_id );

    res
    .status(200)
    .send(specialties);
}

var getPatientList = async (req, res) => {
    var db = req.app.get('db');
    let therapist_id = req.params.id;

    var patientList = await db.therapists.getPatientsList(therapist_id);

    res
    .status(200)
    .send(patientList);

}

var changePatientStatus = async (req, res) => {
    var db = req.app.get('db');
    var status_id = req.params.id;
    let { decision } = req.body;
    await db.therapists.updatePatientStatus( status_id, decision );

    res.sendStatus(200);

}

var addNewAppointment = async (req, res) => {
    var db = req.app.get('db');
    let therapist_id = req.params.id,
        { start, end, title, price } = req.body;
    price = (price * 100);
    await db.therapists.addAppointment( therapist_id, start, end, title, price )
    let appointments = await db.therapists.getAllTherapistAppointments( therapist_id );

    res
    .status(200)
    .send(appointments);
}

var getTherapistAppointments = async (req, res) => {
    const db = req.app.get('db');
    let therapist_id = req.params.id;

    let appointments = await db.therapists.getAllTherapistAppointments( therapist_id );

    res
    .status(200)
    .send(appointments);

}

var updateAppointment = async (req, res) => {
    const db = req.app.get('db');

    let appointment_id = req.params.id,
        patient_id = req.body.user_id;
    await db.therapists.updateAppointment(appointment_id, patient_id);
    console.log(appointment_id, patient_id)

    res
    .sendStatus(200);

}

module.exports = {
    getAllTherapists,
    getOverallRatings,
    getAllReviews,
    postReview,
    getTherapistSpecialties,
    getPatientList,
    changePatientStatus,
    addNewAppointment,
    getTherapistAppointments,
    updateAppointment
}