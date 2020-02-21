var getAllResources = async (req, res) => {
    var db = req.app.get('db');
    var resources = await db.resources.getAllResources();

    res
    .status(200)
    .send(resources);

}

module.exports = {
    getAllResources
}