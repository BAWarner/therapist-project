const bcrypt = require('bcryptjs');

var registerPatient = async (req, res) => {
    var db = req.app.get('db');
    let { username, password, firstName, lastName, email } = req.body;

    var salt = bcrypt.genSaltSync(12);
    var hash = bcrypt.hashSync(password, salt);

    await db.patients.registerPatient([username, hash, firstName, lastName, email]);

    res
    .sendStatus(200);
}

module.exports = {
    registerPatient
}