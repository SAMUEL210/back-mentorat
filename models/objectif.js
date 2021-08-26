var mongoose = require('mongoose')

const objectifSchema = new mongoose.Schema({
    valeur: {
        type: String,
        required: true
    },
    estAtteint: {
        type: Boolean,
        required: true
    }
})

var objectifModel = mongoose.model('objectif', objectifSchema)

module.exports = objectifModel;