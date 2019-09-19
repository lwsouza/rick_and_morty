const mongoose = require('../../config/database');
// const bcrypt = require('bcryptjs');clear


const RickAndMortySchema = new mongoose.Schema({
    character: {
        type: String,
        require: true
    },
    image: {
        type: String
    },
    identifier: {
        type: Number
    },
    dimensions_count: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const RickAndMorty = mongoose.model('RickAndMorty', RickAndMortySchema);

module.exports = RickAndMorty;