const mongoose = require('mongoose');

// Models
const Star = require('../rutas/modelos/star');

// Return all the stars in the dabatase 
exports.getStars = (req, res, next) => {
    Star.find()
    .then( documents => {
        if (documents.length >= 1) {
            const response = {
                count: documents.length,
                stars : documents.map( doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        size: doc.size
                    }
                })
            }
            res.status(200).json(response);
        } else {
            res.status(200).json({
                message: "No stars in the database"
            });
        }
    })
    .catch( error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
}

// Return a star based on a given id 
exports.getStar = (req, res, next) => {
    Star.findById(req.params.id)
    .then( document => {
        if ( !document ) {
            return res.status(200).json({
                message: "Star not found"
            });
        }
        const response = {
            message: "Star found",
            star: {
                _id: document._id,
                name: document.name,
                size: document.size    }
        }
        res.status(200).json(response);
    })
    .catch( error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
}

// Updates an existing star in the database
exports.updateStar = (req, res, next) => {
    const id = req.params.id;
    Star.findById(id)
    .then( documents => {
        if ( !documents ) {
            return res.status(200).json({
                message: "Invalid Star"
            });
        }
        updateStar(id, documents);
    })
    .catch( error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
   
    function updateStar(id, document) {
        const starUpdated =  new Star ({
            _id: id,
            name: req.body.name,
            size: req.body.size
        });
        Star.updateOne({_id: id}, {$set: starUpdated})
        .then( result => {
            const response = {
                message: "Star Updated",
                star: {
                    _id: id,
                    name: document.name,
                    size: document.size
                }
            }
            res.status(200).json(response);
        })
        .catch( error => {
            console.log(error);
            res.status(500).json(error);
        })
    }
}

exports.createStar = (req, res, next) => {
    Star.findOne({ name: req.body.name })
    .then( result => {
        if (result) {
            return res.status(200).json({
                message: "Star already exists",
                result: result
            });
        } else {
            const star = new Star({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                size: req.body.size
            });
            star.save()
            .then( doc => {
                const response = {
                    message: "New star created",
                    star: {
                        _id: doc.id,
                        name: doc.name,
                        size: doc.size
                    }
                }
                res.status(200).json(response);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    error: error
                });
            });
        }
    });
}

exports.deleteStar = (req, res, next) => {
    const id = req.params.id;
    Star.findById(id)
    .then(result => {
        if (!result) {
            return res.status(200).json({
                message: "Invalid Star"
            });
        }
        Star.deleteOne({_id: id})
        .then(document => {
            res.status(200).json({
                message: "Star deleted"
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
    })
}