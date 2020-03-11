const updatePatient = async (req, res) => {
    const db = req.app.get('db');
    let { user_id, firstname, lastname, emailaddress, profile_image, admin } = req.body;
    var updated;
    if( !admin ){
        await db.patients.updatePatient(user_id, firstname, lastname, emailaddress, profile_image);
        updated = await db.patients.getPatient( user_id );
    }else{
        console.log(req.body);
        await db.therapists.updateTherapist(user_id, firstname, lastname, emailaddress, profile_image);
        updated = await db.therapist.getTherapistById( user_id );
    }
    res
    .status(200)
    .send(updated)
}

const postStatus = async (req, res) => {
    console.log('You are hitting the post status endpoint')
    const db = req.app.get('db');
    let { user_id, therapist_id } = req.body;
    await db.patients.postPatientStatus(user_id, therapist_id);

    res
    .sendStatus(200);
}

const getAppointments = async (req, res) => {
    const db = req.app.get('db');
    let user_id = req.params.id,
        therapist_id = req.query.therapist;
    var appointments = await db.patients.getMyTherapistAppointments( therapist_id, user_id );

    res
    .status(200)
    .send(appointments);
}

const getContact = async (req, res) => {
    const db = req.app.get('db');
    let patient_id = req.params.id;

    var contact = await db.patients.getContact(patient_id);

    res
    .status(200)
    .send(contact);

}

const updateAssignment = async (req, res) => {
    const db = req.app.get('db');
    let { user_id, therapist_id } = req.body;

    var statusAssignment = await db.patients.updateAssignment( user_id, therapist_id );

    console.log('updated', statusAssignment);

    res.sendStatus(200);
}

module.exports = {
    updatePatient,
    postStatus,
    getAppointments,
    getContact,
    updateAssignment
}