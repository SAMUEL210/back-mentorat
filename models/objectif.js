var mongoose = require('mongoose')

const objectifSchema = new mongoose.Schema({
    valeur: {
        type: String,
        required: true
    },
    par: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    pour: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    estAtteint: {
        type: Boolean,
        required: false
    }
})

var objectifModel = mongoose.model('objectif', objectifSchema)

module.exports = objectifModel;