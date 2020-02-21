const bcrypt = require('bcryptjs');

var registerUser = async (req, res) => {
    var db = req.app.get('db');
    res
    .sendStatus(200);
}

module.exports = {
    registerUser
}