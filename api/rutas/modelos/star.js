const mongoose = require('mongoose');

const planetSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Planet', planetSchema);