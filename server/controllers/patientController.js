const updatePatient = async (req, res) => {
    const db = req.app.get('db');
    let { user_id, firstname, lastname, emailaddress, profile_image } = req.body;
    await db.patients.updatePatient(user_id, firstname, lastname, emailaddress, profile_image);
    var updated = await db.patients.getPatient( user_id );

    res
    .status(200)
    .send(updated)
}

module.exports = {
    updatePatient
}