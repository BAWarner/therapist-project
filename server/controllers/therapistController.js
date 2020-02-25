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

module.exports = {
    getAllTherapists,
    getOverallRatings
}