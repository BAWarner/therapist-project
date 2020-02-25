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
    console.log(reviews);

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

module.exports = {
    getAllTherapists,
    getOverallRatings,
    getAllReviews,
    postReview
}