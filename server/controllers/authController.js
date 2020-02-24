const bcrypt = require('bcryptjs');

var register = async (req, res) => {
    var db = req.app.get('db');
    let { username, password, firstName, lastName, email } = req.body;
    let { type } = req.params;

    var salt = bcrypt.genSaltSync(12);
    var hash = bcrypt.hashSync(password, salt);

    if(type === 'admin'){
        await db.therapists.registerTherapist([username, hash, firstName, lastName, email])
    }else{
        await db.patients.registerPatient([username, hash, firstName, lastName, email]);
    }

    res
    .sendStatus(200);
}

var login = async (req, res) => {
    var db = req.app.get('db');
    let { username, password } = req.body;

    var patient = await db.patients.getPatient(username);

    if(patient.length  !== 0){
        var areEqual =  bcrypt.compareSync(password, patient[0].password);
        if(areEqual){
            let { patient_id, username, profile_image } = patient[0];
            req.session.user = {
                user_id: patient_id,
                username,
                profile_image
            }
            res
            .status(200)
            .send(username)
        }else{
            res
            .status(403)
            .send('Incorrect username, or password');
        }
    }else{
        var therapist = await db.therapists.getTherapist(username);

        if( therapist .length === 0){
            res
            .status(404)
            .send('Sorry, that usename doesn\'t exist in our system');
        }else{
            var areEqual =  bcrypt.compareSync(password, therapist[0].password);

            if(areEqual){
                let { therapist_id, username, profile_image } = therapist[0];
                req.session.user = {
                    user_id: therapist_id,
                    username,
                    profile_image
                }
                res
                .status(200)
                .send(username)

            }else{
                res
                .status(403)
                .send('Incorrect username, or password');
            }

        }
    }
}

var logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
}

module.exports = {
    register,
    login,
    logout
}