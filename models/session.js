var mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    debut: {
        type: Date,
        required: true
    },
    fin: {
        type: Date,
        required: true
    },
    contrat_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    debrief_id: {
        type: mongoose.Types.ObjectId,
        required: false
    },
    objectifs: {
        type: [mongoose.Types.ObjectId],
        required: false
    }
})

var sessionModel = mongoose.model('session', sessionSchema)

module.exports = sessionModel;