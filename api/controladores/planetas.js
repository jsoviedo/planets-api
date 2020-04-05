const mongoose = require('mongoose');
// Next steps: Import models and build each endpoint


exports.getPlanets = (req, res, next) => {
    console.log("Returns all Planets");
}

exports.getPlanet = (req, res, next) => {
    console.log("Returns a Planet by id");
}

exports.updatePlanet = (req, res, next) => {
    console.log("Updates a Planet by id");
}

exports.createPlanet = (req, res, next) => {
    console.log("Creates a brand new Planet");
}

exports.deletePlanet = (req, res, next) => {
    console.log("Deletes a Planet by id");
}
