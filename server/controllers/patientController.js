const updatePatient = async (req, res) => {
    const db = req.app.get('db');
    let { user_id, firstname, lastname, emailaddress, profile_image } = req.body;
    await db.patients.updatePatient(user_id, firstname, lastname, emailaddress, profile_image);
    var updated = await db.patients.getPatient( user_id );
    console.log(req.session);
    res
    .status(200)
    .send(updated)
}

const postStatus = async (req, res) => {
    const db = req.app.get('db');
    let { user_id, therapist_id } = req.body;
    var patientStatus = await db.patients.postPatientStatus(user_id, therapist_id);

    res
    .status(200)
    .send(patientStatus);
}

module.exports = {
    updatePatient,
    postStatus
}