var getAllResources = async (req, res) => {
    var db = req.app.get('db');
    var resources = await db.resources.getAllResources();

    res
    .status(200)
    .send(resources);

}

const getTherapistResources = async (req, res) => {
    const db = req.app.get('db');
    let therapist_id = req.params.id;
    var resources = await db.resources.getTherapistResources(therapist_id);

    res
    .status(200)
    .send(resources);
}

const addResource = async (req, res) => {
    const db = req.app.get('db');

    let therapist_id = req.params.id;
    let { name, document, description } = req.body;

    var resource = await db.resources.addResource( therapist_id, name, document, description );
    
    res
    .status(200)
    .send(resource);
}

const updateResource = async (req, res) => {
    const db = req.app.get('db');
    let resource_id = req.params.id,
        { name, document, description, therapist_id } = req.body;
    
    var resource = await db.resources.updateResource( resource_id, name, document, description, therapist_id );

    res
    .status(200)
    .send(resource);
    

}

const deleteResource = async (req, res) => {
    const db = req.app.get('db');
    let resource_id = req.params.id;
        
    await db.resources.deleteResource( resource_id );

    res
    .status(200)
    .send(resource_id);
}

module.exports = {
    getAllResources,
    getTherapistResources,
    addResource,
    updateResource,
    deleteResource
}