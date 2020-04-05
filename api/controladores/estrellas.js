const mongoose = require('mongoose');
// Next steps: Import models and build each endpoint funcionalities


exports.getStars = (req, res, next) => {
    console.log("Returns all Stars");
}

exports.getStar = (req, res, next) => {
    console.log("Returns a Star by id");
}

exports.updateStar = (req, res, next) => {
    console.log("Updates a Star by id");
}

exports.createStar = (req, res, next) => {
    console.log("Creates a brand new Star");
}

exports.deleteStar = (req, res, next) => {
    console.log("Deletes a Star by id");
}