var mongoose = require('mongoose')

const retourSchema = new mongoose.Schema({
    objectifs_complete: {
        type: String,
        required: true
    },
    auteur: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

var retourModel = mongoose.model('retour', retourSchema)

module.exports = retourModel;