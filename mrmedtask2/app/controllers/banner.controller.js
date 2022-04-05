const Banner = require('../models/banner.model.js');

// Create and Save a new Banner
exports.create = (req, res) => {
// Validate request
Banner.findById(req.params.bannerId, (err, data) => {
    //if Banner not in db, add it
    if (!data) {

// Create a banner
const banner = new Banner({
    name:req.body.name,
    link:req.body.link,
    status:req.body.status,
    desktopImage:req.body.desktopImage,
    mobileImage:req.body.mobileImage
});

// Save Banner in the database
banner.save()
.then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the Banner."
    });
});

}})
};

// Retrieve and return all Banner from the database.
exports.findAll = async(req, res) => {
    Banner.find({}).sort({status:1,_id:-1})
    .then(banner => {
        res.send(banner);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving banner details."
        });
    });
};

// Find a single Banner with a bannerId
exports.findOne = (req, res) => {
    Banner.findById(req.params.bannerId)
    .then(banner => {
        if(!banner) {
            return res.status(404).send({
                message: "banner not found with id " + req.params.bannerId
            });            
        }
        res.send(banner);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "banner not found with id " + req.params.bannerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving banner with id " + req.params.bannerId
        });
    });
};


// Update a banner identified by the bannerId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Banner Name can not be empty"
        });
    }

    // Find banner and update it with the request body
    Banner.findByIdAndUpdate(req.params.bannerId, {
        name:req.body.name,
        link:req.body.link,
        status:req.body.status,
        desktopImage:req.body.desktopImage,
        mobileImage:req.body.mobileImage
    }, {new: true})
    .then(banner => {
        if(!banner) {
            return res.status(404).send({
                message: "Banner not found with id " + req.params.bannerId
            });
        }
        res.send(banner);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Banner not found with id " + req.params.bannerId
            });                
        }
        return res.status(500).send({
            message: "Error updating Banner with id " + req.params.bannerId
        });
    });

};


// Delete a Banner with the specified bannerId in the request
exports.delete = (req, res) => {
    Banner.findByIdAndRemove(req.params.bannerId)
    .then(banner => {
        if(!banner) {
            return res.status(404).send({
                message: "Banner not found with id " + req.params.bannerId
            });
        }
        res.send({message: "Banner deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Banner not found with id " + req.params.bannerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete banner with id " + req.params.bannerId
        });
    });
};