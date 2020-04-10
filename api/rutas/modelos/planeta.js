const mongoose = require('mongoose');

const planetSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    size: { type: Number, required: true },
    star: { type: String, ref: 'Star', required: true }
});

module.exports = mongoose.model('Planet', planetSchema);