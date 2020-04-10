const mongoose = require('mongoose');

// Modelos
const Planet = require('../rutas/modelos/planeta');

// Returns all planets from the database
exports.getPlanets = (req, res, next) => {
    Planet.find()
    .then( documents => {
        if ( documents.length >= 1 ) {
            const response = {
                count: documents.length,
                planets: documents.map(doc => {
                    return {
                        _id: doc.id,
                        name: doc.name,
                        size: doc.size,
                        star: doc.star,
                        starUrl: 'http://localhost:3000/stars/' + doc.star
                    }
                })                
            }
            res.status(200).json(response);
        } else {
            res.status(200).json({
                message: "No products in the database"
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

// Returns a planet based on a given id
exports.getPlanet = (req, res, next) => {
    const id = req.params.id;
    Planet.findById(id)
    .then( planet => {
        if (!planet) {
            return res.status(200).json({
                message: "No planet found"
            });
        }
        const response = {
            message: "Planet found",
            planet: {
                _id: planet._id,
                name: planet.name,
                size: planet.size,
                star: planet.star,
                starUrl:'http://localhost:3000/stars/' + planet.star
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

// Updates a planet in the database
exports.updatePlanet = (req, res, next) => {
    const id = req.params.id;
    Planet.findById(id)
    .then(planet => {
        if (!planet) {
            return res.status(200).json({
                message: "Invalid planet id"
            });
        }
        updatePlanet(id);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
    
    function updatePlanet(id) {
        const planetUpdated = new Planet({
            _id : id,
            name: req.body.name,
            size: req.body.size,
            star: req.body.star
        });
        Planet.updateOne({_id: id}, {$set: planetUpdated})
        .then(() => {
            Planet.findById(id)
            .then(planet => {
                const response = {
                    message: "Planet updated",
                    planet: {
                        _id: planet.id,
                        name: planet.name,
                        size: planet.size,
                        star: planet.star,
                        starUrl: 'http://localhost:3000/stars/' + planet.star
                    }
                }            
                res.status(200).json(response)
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    message: "Something went wrong",
                    error: error
                });
            });
            
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
    }
}

// Creates a planet in the database
exports.createPlanet = (req, res, next) => {
    Planet.findOne({ name: req.body.name })
    .then( document => {
        if ( !document ) {
            const planet = new Planet({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                size: req.body.size,
                star: req.body.star
            });
            planet.save()
            .then( result => {
                const response = {
                    message: "New planet created",
                    planet: {
                        _id: result._id,
                        name: result.name,
                        size: result.size,
                        star: result.star
                    }
                }
                res.status(200).json(response);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    message: "Oops something went wrong",
                    error: error
                });
            });
        } 
    }); 
}

// Deletes a planet in the database 
exports.deletePlanet = (req, res, next) => {
    const id = req.params.id;
    Planet.findById(id)
    .then(result => {
        if (!result) {
            return res.status(200).json({
                message: "Invalid Planet id"
            });
        }
        Planet.deleteOne({_id: id})
        .then( () => {
            res.status(200).json({
                message: "Planet deleted"
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
    });
}
