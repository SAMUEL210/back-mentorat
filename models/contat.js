var mongoose = require('mongoose')

const contratSchema = new mongoose.Schema({
    duree: {
        type: Number,
        required: true
    },
    frequence: {
        type: Number,
        required: true
    },
    accordMentor: {
        type: Boolean,
        required: false,
    },
    accordMentore: {
        type: Boolean,
        required: true
    },
    sessions: {
        type: [mongoose.Types.ObjectId],
        required: true
    },
    objectifsMentor: {
        type: [mongoose.Types.ObjectId],
        required: true
    },
    objectifsMentore: {
        type: [mongoose.Types.ObjectId],
        required: true
    }
})

var contratModel = mongoose.model('contrat', contratSchema)

module.exports = contratModel;