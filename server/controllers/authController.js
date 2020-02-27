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

    var patient = await db.patients.loginPatient(username);

    if(patient.length !== 0){
        var areEqual =  bcrypt.compareSync(password, patient[0].password);
        if(areEqual){
            let { patient_id, username, profile_image, firstname, lastname, emailaddress } = patient[0];
            const checkStatus = await db.patients.checkPatientStatus( patient_id );
            
            if(checkStatus.length > 0){
                var { status } = checkStatus[0];
                var therapist_info = {
                    name: checkStatus[0].firstname + ' ' +checkStatus[0].lastname,
                    id: checkStatus[0].therapist_id
                };
            }else{
                var status = 'inactive';
                var therapist_info = {};
            }

            req.session.user = {
                user_id: patient_id,
                username,
                firstname,
                lastname,
                emailaddress,
                profile_image,
                status,
                therapist_info
            }
            res
            .status(200)
            .send(req.session.user)
        }else{
            res
            .status(403)
            .send('Incorrect username, or password');
        }
    }else{
        var therapist = await db.therapists.getTherapist(username);

        if( therapist.length === 0){
            res
            .status(404)
            .send('Sorry, that usename doesn\'t exist in our system');
        }else{
            var areEqual =  bcrypt.compareSync(password, therapist[0].password);

            if(areEqual){
                let { therapist_id, username, firstname, lastname, emailaddress, profile_image } = therapist[0];
                req.session.user = {
                    user_id: therapist_id,
                    username,
                    firstname,
                    lastname,
                    emailaddress,
                    admin: true,
                    profile_image
                }
                res
                .status(200)
                .send(req.session.user)

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

var retrieveUser = (req, res) => {
    res
    .status(200)
    .send(req.session.user);
}

module.exports = {
    register,
    login,
    logout,
    retrieveUser
}