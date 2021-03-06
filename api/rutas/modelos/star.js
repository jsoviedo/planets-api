const mongoose = require('mongoose');

const starSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    size: { type: Number, required: true }
});

module.exports = mongoose.model('Star', starSchema);